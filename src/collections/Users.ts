import { isAdmin, isAdminOrMe } from '@/service/accessControl';
import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200,
    verify: true,
    maxLoginAttempts: 5, // Allow 5 login attempts before lockout
    lockTime: 600 * 1000, // 10 minutes
  },
  access: {
    read: isAdminOrMe,
    update: isAdmin,
    delete: isAdmin,
    create: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      saveToJWT: true,
    },
  ],
};
