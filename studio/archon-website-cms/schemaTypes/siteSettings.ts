import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'companyName',
      title: 'Company name',
      type: 'string',
      initialValue: 'Archon',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Dream Without Limits. Build With Purpose.',
    }),

    defineField({
      name: 'learnersCount',
      title: 'Learners influenced',
      type: 'number',
      initialValue: 7000,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'placementsCount',
      title: 'Placements / career outcomes',
      type: 'number',
      initialValue: 2000,
      validation: (Rule) => Rule.min(0),
    }),

    defineField({
      name: 'globalLocationsCount',
      title: 'Global locations',
      type: 'number',
      initialValue: 4,
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: 'foundedYear',
      title: 'Founded year',
      type: 'number',
      initialValue: 2013,
      validation: (Rule) => Rule.required().min(1900),
    }),

    defineField({
      name: 'primaryEmail',
      title: 'Primary email',
      type: 'string',
    }),

    defineField({
      name: 'primaryPhone',
      title: 'Primary phone',
      type: 'string',
    }),

    defineField({
      name: 'socialProfiles',
      title: 'Social profiles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),

    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),

    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Archon Site Settings',
      }
    },
  },
})