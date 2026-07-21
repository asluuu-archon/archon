import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Product name',
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
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(240),
    }),

    defineField({
      name: 'status',
      title: 'Product status',
      type: 'string',
      options: {
        list: [
          {title: 'Concept', value: 'concept'},
          {title: 'Prototype', value: 'prototype'},
          {title: 'Building', value: 'building'},
          {title: 'Private Beta', value: 'private-beta'},
          {title: 'Live', value: 'live'},
          {title: 'Paused', value: 'paused'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Artificial Intelligence', value: 'ai'},
          {title: 'Collaboration', value: 'collaboration'},
          {title: 'Learning Technology', value: 'learning'},
          {title: 'Business Intelligence', value: 'business-intelligence'},
          {title: 'Automation', value: 'automation'},
          {title: 'Research & Development', value: 'research'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'features',
      title: 'Key features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'website',
      title: 'Product website',
      type: 'url',
    }),

    defineField({
      name: 'featured',
      title: 'Featured product',
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
      status: 'status',
      media: 'featuredImage',
    },

    prepare({title, status, media}) {
      return {
        title,
        subtitle: status,
        media,
      }
    },
  },
})