import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tagName',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tagName',
      type: 'text',
      required: true,
    },
  ],
}
