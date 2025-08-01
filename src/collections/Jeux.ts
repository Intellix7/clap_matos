import { isAdmin } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const Jeux: CollectionConfig = {
  slug: 'jeux',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  labels: {
    singular: 'Jeu',
    plural: 'Jeux',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom du jeu',
      required: true,
    },
    {
      name: 'categorie',
      type: 'relationship',
      relationTo: 'categoriesJeux',
      required: true,
      label: 'Catégorie',
    },
    {
      name: 'aquisitionDate',
      type: 'date',
      label: "Date d'acquisition",
      defaultValue: () => new Date(),
    },
    {
      name: 'playingTime',
      type: 'text',
      label: 'Temps de jeu (en minutes)',
      required: false,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nbMinPlayers',
          type: 'number',
          label: 'Nombre minimum de joueurs',
          required: false,
        },
        {
          name: 'nbMaxPlayers',
          type: 'number',
          label: 'Nombre maximum de joueurs',
          required: false,
        },
      ],
    },
    {
      name: 'nbGames',
      type: 'number',
      label: 'Nombre de jeux disponibles',
      defaultValue: 1,
      required: true,
      min: 1,
    },
    {
      name: 'nbGamesAvailable',
      type: 'number',
      required: true,
      label: 'Nombre de jeux disponibles actuellement',
      defaultValue: -1, // This will be set in the beforeChange hook
      access: {
        update: () => false,
        create: () => false,
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, originalDoc }) => {
        if (
          originalDoc &&
          originalDoc.nbGames !== data.nbGames &&
          data.nbGamesAvailable !== -1 // Ensure this is not the initial creation
        ) {
          data.nbGamesAvailable =
            originalDoc.nbGamesAvailable + (data.nbGames - originalDoc.nbGames);
          if (data.nbGamesAvailable < 0) {
            throw new Error(
              'Le nombre de jeux disponibles ne peut pas être négatif.'
            );
          }
        }
        data.nbGamesAvailable =
          data.nbGamesAvailable != -1 ? data.nbGamesAvailable : data.nbGames;
        if (data.nbGamesAvailable < 0) {
          throw new Error(
            'Le nombre de jeux disponibles ne peut pas être négatif.'
          );
        }
        return data;
      },
    ],
    afterChange: [
      async ({ data, operation }) => {
        if (operation === 'create' || operation === 'update') {
          // Ensure nbGamesAvailable is not less than 0
          if (data.nbGamesAvailable < 0) {
            throw new Error(
              'Le nombre de jeux disponibles ne peut pas être négatif.'
            );
          }
        }
      },
    ],
  },
};
