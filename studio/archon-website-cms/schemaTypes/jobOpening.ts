import {defineArrayMember, defineField, defineType} from 'sanity'

export const jobOpening = defineType({
  name: 'jobOpening',
  title: 'Job Opening',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Job title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Consulting', value: 'consulting'},
          {title: 'Engineering', value: 'engineering'},
          {title: 'Learning', value: 'learning'},
          {title: 'Products', value: 'products'},
          {title: 'Operations', value: 'operations'},
          {title: 'Sales & Partnerships', value: 'sales-partnerships'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'workMode',
      title: 'Work mode',
      type: 'string',
      options: {
        list: [
          {title: 'On-site', value: 'onsite'},
          {title: 'Hybrid', value: 'hybrid'},
          {title: 'Remote', value: 'remote'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'employmentType',
      title: 'Employment type',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'full-time'},
          {title: 'Part-time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'applyEmail',
      title: 'Application email',
      type: 'string',
    }),

    defineField({
      name: 'applyUrl',
      title: 'Application link',
      type: 'url',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'closingDate',
      title: 'Closing date',
      type: 'date',
    }),

    defineField({
      name: 'active',
      title: 'Currently accepting applications',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      location: 'location',
      workMode: 'workMode',
    },

    prepare({title, location, workMode}) {
      return {
        title,
        subtitle: [location, workMode].filter(Boolean).join(' · '),
      }
    },
  },
})