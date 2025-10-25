export default {
  name: 'leadership',
  title: 'Leadership Message',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          { title: 'President', value: 'President' },
          { title: 'General Secretary', value: 'General Secretary' },
          { title: 'Vice President', value: 'Vice President' },
          { title: 'Treasurer', value: 'Treasurer' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'academicInfo',
      title: 'Academic Information',
      type: 'string',
      description: 'e.g., Senior, Civil Engineering',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Leadership message'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Display on homepage'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    }
  }
}
