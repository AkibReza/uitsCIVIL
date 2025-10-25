export default {
  name: 'mediaGallery',
  title: 'Media Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Facilities', value: 'Facilities' },
          { title: 'Events', value: 'Events' },
          { title: 'Activities', value: 'Activities' },
          { title: 'Projects', value: 'Projects' },
          { title: 'Education', value: 'Education' },
          { title: 'Community', value: 'Community' },
          { title: 'Other', value: 'Other' }
        ]
      },
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
        },
        {
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }
      ],
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'featured',
      title: 'Featured in Homepage Slider',
      type: 'boolean',
      initialValue: false,
      description: 'If checked, this image will appear in the homepage slider'
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order in which the image should appear'
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image'
    },
    prepare(selection) {
      const { title, category, media } = selection
      return {
        title: title,
        subtitle: category,
        media: media
      }
    }
  }
}
