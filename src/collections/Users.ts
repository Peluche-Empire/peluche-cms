import type { Access, CollectionConfig } from 'payload'

const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.roles?.includes('super-admin') ?? false
}

const isSelfOrSuperAdmin: Access = ({ req: { user }, id }) => {
  if (user?.roles?.includes('super-admin')) return true
  return user?.id === id
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => !user?.roles?.includes('super-admin'),
  },
  access: {
    read: isSelfOrSuperAdmin,
    create: isSuperAdmin,
    update: isSelfOrSuperAdmin,
    delete: isSuperAdmin,
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req: { user } }) => {
          return user?.roles?.includes('super-admin') ?? false
        },
      },
    },
  ],
}
