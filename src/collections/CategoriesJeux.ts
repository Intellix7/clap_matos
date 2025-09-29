import { isBureau } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const CategorieJeux: CollectionConfig = {
  slug: 'categoriesJeux',
  admin: {
    useAsTitle: 'name',
  },
  labels: {
    singular: 'Catégorie de jeu',
    plural: 'Catégories de jeux',
  },
  access: {
    read: () => true,
    update: isBureau,
    delete: isBureau,
    create: isBureau,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nom de la catégorie',
      required: true,
    },
  ],
};
