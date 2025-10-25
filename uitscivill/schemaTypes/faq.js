export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'General' },
          { title: 'Membership', value: 'Membership' },
          { title: 'Events', value: 'Events' },
          { title: 'Research', value: 'Research' },
          { title: 'Academic', value: 'Academic' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)'
    },
    {
      name: 'featured',
      title: 'Show on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, this FAQ will appear on the homepage'
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category'
    }
  }
}
