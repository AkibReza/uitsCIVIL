export default {
  name: 'panelMember',
  title: 'Panel Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'President', value: 'President' },
          { title: 'Vice President', value: 'Vice President' },
          { title: 'Secretary', value: 'Secretary' },
          { title: 'Treasurer', value: 'Treasurer' },
          { title: 'Technical Coordinator', value: 'Technical Coordinator' },
          { title: 'Event Coordinator', value: 'Event Coordinator' },
          { title: 'Public Relations Officer', value: 'Public Relations Officer' },
          { title: 'Executive Member', value: 'Executive Member' },
        ],
      },
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Civil Engineering',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.min(0),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image',
    },
  },
}
