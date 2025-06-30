import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user && user.role === 'admin',
    create: () => true,
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
    },
    {
      name: 'password',
      type: 'text',
      required: true,
      admin: {
        hidden: true,
      },
    },
  ],
}
