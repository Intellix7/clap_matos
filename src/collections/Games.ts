import { isAdmin } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const Games: CollectionConfig = {
  slug: 'games',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom du jeu',
      required: true,
    },
  ],
};
