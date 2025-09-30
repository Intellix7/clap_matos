import { isUser } from '@/service/accessControl';
import { borrowGame, returnGame } from '@/service/borrowGames';
import populateCreatedBy from '@/service/populateCreatedBy';
import getGamesFromEmprunt from '@/utils/getGamesFromEmprunt';
import type { CollectionConfig } from 'payload';

export const Emprunts: CollectionConfig = {
  slug: 'emprunts',
  access: {
    read: isUser,
    update: isUser,
    delete: isUser,
    create: isUser,
  },
  labels: {
    singular: 'Emprunt',
    plural: 'Emprunts',
  },
  admin: {
    useAsTitle: 'games',
  },
  fields: [
    {
      name: 'games',
      type: 'relationship',
      relationTo: 'jeux',
      required: true,
      hasMany: true,
      label: 'Jeu',
      filterOptions: {
        nbGamesAvailable: {
          greater_than: 0,
        },
      },
    },
    {
      name: 'borrowerName',
      type: 'text',
      label: "Nom de l'emprunteur",
      required: true,
    },
    {
      name: 'borrower',
      type: 'email',
      label: "Mail de l'emprunteur (si présent, un rappel sera envoyé)",
    },
    {
      name: 'jobIds',
      type: 'number',
      label: "IDs des jobs d'envoi de mails (interne)",
      hidden: true,
      hasMany: true,
    },
    {
      name: 'dateRetour',
      type: 'date',
      label: 'Date de retour',
      required: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy', // Unicode format
        },
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Créé par',
      admin: {
        position: 'sidebar',
        readOnly: true,
        allowCreate: false,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        if (operation === 'create') {
          await populateCreatedBy({ req, data });
        }
      },
    ],

    afterChange: [
      async ({ req, doc, operation, previousDoc }) => {
        if (operation !== 'create') {
          const previousGames = await getGamesFromEmprunt(previousDoc, req);
          const currentGames = await getGamesFromEmprunt(doc, req);

          const removedGames = previousGames.filter(
            (pg) => !currentGames.find((cg) => cg.id === pg.id)
          );
          const addedGames = currentGames.filter(
            (cg) => !previousGames.find((pg) => pg.id === cg.id)
          );

          const nbGamesAvailable = addedGames.map((g) => g.nbGamesAvailable);
          if (nbGamesAvailable.some((available) => available <= 0)) {
            throw new Error(
              `Le jeu ${addedGames.find((g) => g.nbGamesAvailable <= 0)?.name} est déjà emprunté.`
            );
          }

          // Mark the added games as borrowed
          await Promise.all(addedGames.map((game) => borrowGame(game, req)));

          // Mark the removed games as returned
          await Promise.all(removedGames.map((game) => returnGame(game, req)));

          return;
        }

        const games = await getGamesFromEmprunt(doc, req);

        const userMailDate = new Date(
          new Date(doc.dateRetour).getTime() - 1 * 24 * 60 * 60 * 1000
        ); // 1 day before return date

        const adminMailDate = new Date(
          new Date(doc.dateRetour).getTime() + 1 * 24 * 60 * 60 * 1000
        ); // 1 day after return date

        let jobIds: number[] = [];
        if (doc.borrower && userMailDate > new Date()) {
          const clientJob = await req.payload.jobs.queue({
            task: 'sendClientReminder',
            input: {
              email: doc.borrower,
              gamesName: games.map((g) => g.name),
              name: doc.borrowerName,
            },
            waitUntil: userMailDate,
          });
          jobIds.push(clientJob.id);
        }

        if (req.user?.email && new Date(doc.dateRetour) > new Date()) {
          const adminJob = await req.payload.jobs.queue({
            task: 'sendAdminReminder',
            input: {
              email: req.user?.email || '',
              gamesName: games.map((g) => g.name),
              name: doc.borrowerName,
            },
            waitUntil: adminMailDate,
          });
          jobIds.push(adminJob.id);
        }

        // Save jobIds back into the Emprunt doc
        if (jobIds.length > 0) {
          await req.payload.update({
            id: doc.id,
            collection: 'emprunts',
            data: { jobIds },
          });
        }

        const nbGamesAvailable = games.map((g) => g.nbGamesAvailable);

        if (nbGamesAvailable.some((available) => available <= 0)) {
          throw new Error(
            `Le jeu ${games.find((g) => g.nbGamesAvailable <= 0)?.name} est déjà emprunté.`
          );
        }

        // Mark the games as borrowed
        await Promise.all(games.map((game) => borrowGame(game, req)));
      },
    ],

    afterDelete: [
      async ({ req, doc }) => {
        let games = await getGamesFromEmprunt(doc, req);

        await Promise.all([
          // Log the emprunt in the historiqueEmprunt collection
          req.payload.create({
            collection: 'historiqueEmprunt',
            data: doc,
          }),

          // Cancel any pending jobs related to this emprunt
          req.payload.jobs.cancel({
            where: {
              id: { in: doc.jobIds },
            },
          }),

          // Mark the games as returned when the emprunt is deleted
          games.map((game) => returnGame(game, req)),
        ]);
      },
    ],
  },
};
