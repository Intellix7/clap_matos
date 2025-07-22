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
        borrowed: {
          equals: false,
        },
      },
    },
    {
      name: 'borrower',
      type: 'email',
      label: 'Emprunteur',
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

        if (game.borrowed) {
          throw new Error('Ce jeu est déjà emprunté.');
        }

        // Mark the game as borrowed
        await req.payload.update({
          id: game.id,
          collection: 'jeux',
          data: { borrowed: true },
        });
      },
    ],
    afterDelete: [
      async ({ req, doc }) => {
        const gameId: number =
          typeof doc.game === 'number' ? doc.game : doc.game.id;
        // Mark the game as not borrowed when the emprunt is deleted
        await req.payload.update({
          id: gameId,
          collection: 'jeux',
          data: { borrowed: false },
        });
      },
    ],
  },
};
