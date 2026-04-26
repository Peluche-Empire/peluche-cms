import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.roles?.includes('super-admin') ?? false
}

const isSuperAdminField: FieldAccess = ({ req: { user } }) => {
  return user?.roles?.includes('super-admin') ?? false
}

const canReadTenants: Access = ({ req: { user } }) => {
  if (!user) return false
  // Super admins can read all tenants
  if (user.roles?.includes('super-admin')) return true
  // Editors can read their assigned tenants (needed for the tenant selector)
  const tenantIds = (user.tenants ?? [])
    .map((t: { tenant: number | { id: number } }) =>
      typeof t.tenant === 'object' ? t.tenant.id : t.tenant,
    )
    .filter(Boolean)
  if (tenantIds.length === 0) return false
  return { id: { in: tenantIds } }
}

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  admin: {
    useAsTitle: 'name',
    hidden: ({ user }) => !user?.roles?.includes('super-admin'),
  },
  access: {
    read: canReadTenants,
    create: isSuperAdmin,
    update: isSuperAdmin,
    delete: isSuperAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'deployHook',
      type: 'text',
      admin: {
        description:
          'Cloudflare Workers Builds deploy hook URL. Triggered when an article is published or a published article is updated.',
      },
      access: {
        read: isSuperAdminField,
        update: isSuperAdminField,
        create: isSuperAdminField,
      },
    },
  ],
}
