import { Jeux } from '@/payload-types';
import { isUser } from '@/service/accessControl';
import populateCreatedBy from '@/service/populateCreatedBy';
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
    useAsTitle: 'game',
  },
  fields: [
    {
      name: 'game',
      type: 'relationship',
      relationTo: 'jeux',
      required: true,
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
      async ({ req, doc, operation }) => {
        if (operation !== 'create') {
          return;
        }

        let game: Jeux;
        if (typeof doc.game === 'number') {
          game = await req.payload.findByID({
            id: doc.game,
            collection: 'jeux',
          });
        } else {
          game = doc.game as Jeux;
        }

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
              gameName: game.name,
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
              gameName: game.name,
              name: doc.borrowerName,
            },
            waitUntil: adminMailDate,
          });
          jobIds.push(adminJob.id);
        }

        // Save jobIds back into the Emprunt doc
        if (jobIds.length > 0) {
          const test = await req.payload.update({
            id: doc.id,
            collection: 'emprunts',
            data: { jobIds },
          });
        }

        const nbGamesAvailable = game.nbGamesAvailable;

        if (nbGamesAvailable <= 0) {
          throw new Error('Ce jeu est déjà emprunté.');
        }

        // Mark the game as borrowed
        await req.payload.update({
          id: game.id,
          collection: 'jeux',
          data: { nbGamesAvailable: nbGamesAvailable - 1 },
        });
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        let game: Jeux;
        if (typeof doc.game === 'number') {
          game = await req.payload.findByID({
            id: doc.game,
            collection: 'jeux',
          });
        } else {
          game = doc.game as Jeux;
        }

        const result = await Promise.all([
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

          // Mark the game as not borrowed when the emprunt is deleted
          req.payload.update({
            id: game.id,
            collection: 'jeux',
            data: { nbGamesAvailable: game.nbGamesAvailable + 1 },
          }),
        ]);
      },
    ],
  },
};
