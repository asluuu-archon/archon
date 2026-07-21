import {defineArrayMember, defineField, defineType} from 'sanity'

export const insight = defineType({
  name: 'insight',
  title: 'Insight Article',
  type: 'document',

  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],

  fields: [
    defineField({
      name: 'title',
      title: 'Article title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(10).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Short summary',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (Rule) => Rule.required().max(300),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'SAP & ERP', value: 'sap-erp'},
          {title: 'AI & Automation', value: 'ai-automation'},
          {title: 'Software Engineering', value: 'software-engineering'},
          {title: 'Cloud & DevOps', value: 'cloud-devops'},
          {title: 'Data & Analytics', value: 'data-analytics'},
          {title: 'Cybersecurity', value: 'cybersecurity'},
          {title: 'Careers', value: 'careers'},
          {title: 'Consulting', value: 'consulting'},
          {title: 'Founder Notes', value: 'founder-notes'},
          {title: 'Learner Stories', value: 'learner-stories'},
          {title: 'Company Updates', value: 'company-updates'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'authorName',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'Archon',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featured',
      title: 'Feature this article',
      type: 'boolean',
      group: 'content',
      initialValue: false,
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Article content',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
        }),

        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: 'noIndex',
      title: 'Prevent search-engine indexing',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'featuredImage',
    },
  },

  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})