export default {
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Event Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      description: 'Select the event date',
    },
    {
      name: 'time',
      title: 'Event Time',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Format: 10:00 AM - 4:00 PM',
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Event location',
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
      rows: 4,
      description: 'Brief description for the card view (max 300 characters)',
    },
    {
      name: 'details',
      title: 'Detailed Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      rows: 8,
      description: 'Full event details shown in the modal',
    },
    {
      name: 'organizer',
      title: 'Organizer',
      type: 'string',
      initialValue: 'ACI UITS Student Chapter',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'capacity',
      title: 'Event Capacity',
      type: 'number',
      description: 'Maximum number of participants',
    },
    {
      name: 'registered',
      title: 'Registered Participants',
      type: 'number',
      description: 'Current number of registered participants',
      initialValue: 0,
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'images',
      title: 'Additional Event Images',
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
              title: 'Alternative Text',
              type: 'string',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 0,
    },
    {
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      description: 'Mark this event as featured',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      venue: 'venue',
      media: 'image',
    },
    prepare(selection) {
      const { title, date, venue, media } = selection
      return {
        title: title,
        subtitle: `${date} - ${venue}`,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Date (Earliest First)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
