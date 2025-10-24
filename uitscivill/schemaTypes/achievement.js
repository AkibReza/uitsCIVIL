export default {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
      description: 'Detailed description of the achievement',
    },
    {
      name: 'image',
      title: 'Image',
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'isInternational',
      title: 'Is International Event',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle if this is an international event',
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      description: 'Date when the achievement was earned',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Location where the event took place',
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Additional images for the achievement detail page',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.min(0),
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
      isInternational: 'isInternational',
    },
    prepare(selection) {
      const { title, subtitle, media, isInternational } = selection;
      return {
        title: title,
        subtitle: `${subtitle || 'No date'} ${isInternational ? '🌍 International' : '🏠 Local'}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date, Newest First',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
}
