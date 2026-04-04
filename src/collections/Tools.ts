import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
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
    {
      name: 'titleImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'toolCategory',
      type: 'relationship',
      relationTo: 'tool-categories',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'url',
      type: 'text',
    },
    {
      name: 'ctaText',
      type: 'text',
    },
  ],
}
