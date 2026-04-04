import type { CollectionConfig } from 'payload'

export const ToolCategories: CollectionConfig = {
  slug: 'tool-categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
