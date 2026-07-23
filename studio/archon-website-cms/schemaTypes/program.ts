import {defineField, defineType} from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Learning Program',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Program Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Category Label',
      description: 'e.g., Mentorship, Training',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      description: 'Appears on the program card on the homepage',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pathwayEyebrow',
      title: 'Pathway Eyebrow',
      description: 'e.g., Mentorship-led pathway',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outcome',
      title: 'Intended Outcome',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration Label',
      description: 'e.g., Outcome focused, Project driven',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'audience',
      title: 'Designed For',
      description: 'e.g., Graduates and career switchers',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stages',
      title: 'Learning Stages',
      description: 'The step-by-step sequence shown in the pathway timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Stage Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Stage Description',
              type: 'text',
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1).max(7),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this program appears (lower numbers first)',
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
    },
  },
})
