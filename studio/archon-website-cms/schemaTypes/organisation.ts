import {defineField, defineType} from 'sanity'

export const organisation = defineType({
  name: 'organisation',
  title: 'Organisation / Partner',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Organisation name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'relationshipType',
      title: 'Relationship type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Selected Client',
            value: 'selected-client',
          },
          {
            title: 'Project Experience',
            value: 'project-experience',
          },
          {
            title: 'Academic Collaboration',
            value: 'academic',
          },
          {
            title: 'Technology / Delivery Partner',
            value: 'technology-delivery',
          },
          {
            title: 'Technology Used',
            value: 'technology-used',
          },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'industry',
      title: 'Industry or category',
      type: 'string',
    }),

    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),

    defineField({
      name: 'featured',
      title: 'Show prominently',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'relationshipType',
      media: 'logo',
    },
  },
})