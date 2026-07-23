import {defineField, defineType} from 'sanity'

export const homepageJourney = defineType({
  name: 'homepageJourney',
  title: 'Homepage Impact Journey',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Journey Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      description: 'e.g., Learner Transformation, Global Expansion',
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
      name: 'status',
      title: 'Status Indicator',
      description: 'e.g., Growing, Milestone, Connected',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Metric',
      description: 'The large number (e.g., 7,000+, 1st, 4)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlightLabel',
      title: 'Highlight Label',
      description: 'e.g., Learners skilled, Global locations',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination / Outcome',
      description: 'e.g., Global technology careers',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Journey Steps',
      description: 'The sequence shown in the timeline (typically 5 steps)',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(2).max(7),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this journey appears (lower numbers first)',
      initialValue: 50,
    }),
  ],
  preview: {
    select: {
      title: 'eyebrow',
      subtitle: 'title',
    },
  },
})
