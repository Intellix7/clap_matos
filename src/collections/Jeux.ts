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
      label:
        "Date d'acquisition (si non renseignée, la date actuelle sera utilisée)",
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
      name: 'borrowed',
      type: 'checkbox',
      label: 'Emprunté (automatique)',
      defaultValue: false,
      access: {
        update: () => false,
        create: () => false,
      },
    },
  ],
};
