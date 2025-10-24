export default {
  name: 'panelYear',
  title: 'Panel Year',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Academic Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Format: YYYY-YYYY (e.g., 2024-2025)',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Panel 2024-2025',
    },
    {
      name: 'members',
      title: 'Panel Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'panelMember' }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'isActive',
      title: 'Active Panel',
      type: 'boolean',
      description: 'Mark this as the current active panel',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, isActive } = selection
      return {
        title: title,
        subtitle: isActive ? '✓ Active Panel' : 'Inactive',
      }
    },
  },
}
