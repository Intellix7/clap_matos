import { Jeux } from '@/payload-types';
import { isAdmin, isAdminField } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const Emprunts: CollectionConfig = {
  slug: 'emprunts',
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
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
      name: 'borrower',
      type: 'email',
      label: "Mail de l'emprunteur",
      required: true,
      access: {
        read: isAdminField,
      },
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
  ],
  hooks: {
    afterChange: [
      async ({ req, data, operation }) => {
        if (operation !== 'create') {
          return;
        }

        let game: Jeux;
        if (typeof data.game === 'number') {
          game = await req.payload.findByID({
            id: data.game,
            collection: 'jeux',
          });
        } else {
          game = data.game as Jeux;
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

        // Mark the game as not borrowed when the emprunt is deleted
        await req.payload.update({
          id: game.id,
          collection: 'jeux',
          data: { nbGamesAvailable: game.nbGamesAvailable + 1 },
        });
      },
    ],
  },
};
