import type { CollectionConfig } from 'payload'
import { triggerDeployHook } from '../hooks/triggerDeployHook'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'category', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: false,
    },
  },
  hooks: {
    afterChange: [triggerDeployHook],
  },
  fields: [
    {
      name: 'title',
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'country',
      type: 'relationship',
      relationTo: 'countries',
      admin: {
        condition: (data) => {
          // Hide the country field for Bassyana — only relevant for Goonie Nomada
          // The multi-tenant plugin populates data.tenant as an object on existing docs
          const tenant = data?.tenant
          if (!tenant) return true
          if (typeof tenant === 'object' && 'slug' in tenant) {
            return tenant.slug !== 'bassyana'
          }
          // For new docs, tenant is just the numeric ID set by the plugin
          // Bassyana = 1 in both dev and prod
          return tenant !== 1
        },
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
