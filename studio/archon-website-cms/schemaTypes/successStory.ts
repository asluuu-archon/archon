import {defineField, defineType} from 'sanity'

export const successStory = defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',

  fields: [
    defineField({
      name: 'personName',
      title: 'Person name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'personName',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Photo',
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
      name: 'background',
      title: 'Background before Archon',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'pathway',
      title: 'Learning pathway',
      type: 'string',
    }),

    defineField({
      name: 'currentRole',
      title: 'Current role',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),

    defineField({
      name: 'story',
      title: 'Journey',
      type: 'text',
      rows: 8,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn profile or proof',
      type: 'url',
    }),

    defineField({
      name: 'videoUrl',
      title: 'Video or Instagram Reel',
      type: 'url',
    }),

    defineField({
      name: 'featured',
      title: 'Featured story',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  preview: {
    select: {
      title: 'personName',
      role: 'currentRole',
      company: 'company',
      media: 'photo',
    },

    prepare({title, role, company, media}) {
      return {
        title,
        subtitle: [role, company].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})