export default {
  name: 'facultyAdvisor',
  title: 'Faculty Advisor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title/Position',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'credentials',
      title: 'Credentials',
      type: 'string',
      description: 'e.g., Ph.D. in Structural Engineering, 20+ years experience'
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
      description: 'Advisor message to students'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string'
    },
    {
      name: 'active',
      title: 'Active Advisor',
      type: 'boolean',
      initialValue: true,
      description: 'Only one advisor should be active at a time'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
}
