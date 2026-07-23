import {defineField, defineType} from 'sanity'

export const consultingService = defineType({
  name: 'consultingService',
  title: 'Consulting Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Full Title',
      description: 'e.g., SAP Consulting, Migration & Integration',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortTitle',
      title: 'Short Title',
      description: 'Used for the sidebar navigation (e.g., SAP, Integration)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      description: 'e.g., Enterprise Transformation',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status Indicator',
      description: 'e.g., Delivery active, Pipelines online',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Included Services',
      description: 'The bullet points listed under the description',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Metric Value',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Metric Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1).max(4),
    }),
    defineField({
      name: 'activity',
      title: 'Activity Stream',
      description: 'The sequence of operational events shown in the animated terminal',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this capability appears (lower numbers first)',
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
})
