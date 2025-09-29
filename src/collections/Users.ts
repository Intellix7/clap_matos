import { isBureau, isBureauOrMe } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  auth: {
    tokenExpiration: 60 * 60 * 12, // 12 hours
    verify: true,
    maxLoginAttempts: 5, // Allow 5 login attempts before lockout
    lockTime: 600 * 1000, // 10 minutes
  },
  access: {
    read: isBureauOrMe,
    update: isBureau,
    delete: isBureau,
    create: isBureau,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Bureau', value: 'bureau' },
        { label: 'Passe-partout', value: 'passePartout' },
      ],
      defaultValue: 'passePartout',
      required: true,
      saveToJWT: true,
    },
  ],
};
