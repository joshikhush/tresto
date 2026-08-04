import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { revalidateCaseStudy, revalidateCaseStudyDelete } from '../hooks/revalidateCaseStudy'

const isClientStory = (data: Record<string, unknown>) => data?.section === 'client-story'
const isFullPage = (data: Record<string, unknown>) => data?.displayType === 'full-page'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },

  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'displayType', 'industry', 'status', 'updatedAt'],
    description: 'Every project shown on tresto.in/work.',
  },

  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
  },

  versions: { drafts: true },

  hooks: {
    afterChange: [revalidateCaseStudy],
    afterDelete: [revalidateCaseStudyDelete],
  },

  fields: [
    // ---------------- SIDEBAR ----------------
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft (not on site)', value: 'draft' },
        { label: 'Published (live)', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'section',
      type: 'select',
      required: true,
      defaultValue: 'team-portfolio',
      options: [
        { label: 'Client Stories (Tresto projects)', value: 'client-story' },
        { label: 'What Our Team Has Shipped', value: 'team-portfolio' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Which section of /work this appears in.',
      },
    },
    {
      name: 'displayType',
      type: 'select',
      required: true,
      defaultValue: 'full-page',
      options: [
        { label: 'Grid card only', value: 'grid-only' },
        { label: 'Full case study page', value: 'full-page' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Grid card = tile only, not clickable. Full page = gets its own URL. Switching from full page back to grid will 404 that URL for anyone who saved it.',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show on the homepage.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 10,
      admin: {
        position: 'sidebar',
        description:
          'Lower shows first. Use gaps of 10 (10, 20, 30) so you can insert between later without renumbering.',
      },
    },
    slugField('title'),

    // ---------------- MAIN ----------------
    {
      type: 'tabs',
      tabs: [
        // ===== CARD =====
        {
          label: 'Card',
          description: 'Everything a grid-card project needs. Stop here if it is grid-only.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { description: 'Project name. Example: TipTop Cabby' },
            },
            {
              name: 'client',
              type: 'text',
              admin: {
                description:
                  'Usually left blank. Only fill when we have written permission to name them.',
              },
            },
            {
              name: 'year',
              type: 'text',
              admin: {
                description:
                  'Shown in the meta strip. Example: 2025. Leave blank if unknown — the strip just shows one less item.',
              },
            },
            {
              name: 'industry',
              type: 'select',
              required: true,
              options: [
                { label: 'Real Estate', value: 'real-estate' },
                { label: 'Ride-Hailing / Mobility', value: 'mobility' },
                { label: 'Industrial IoT', value: 'iot' },
                { label: 'ERP / Business Systems', value: 'erp' },
                { label: 'Retail / POS', value: 'retail' },
                { label: 'Education', value: 'education' },
                { label: 'Manufacturing', value: 'manufacturing' },
                { label: 'Agriculture', value: 'agriculture' },
                { label: 'Other', value: 'other' },
              ],
              admin: { description: 'Drives the filter chips on /work.' },
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
              maxLength: 200,
              admin: {
                description:
                  'Write this as a headline, not a label. State the outcome, not the category. This is the line most visitors will read instead of the full page.',
              },
            },
            {
              name: 'techStack',
              type: 'array',
              labels: { singular: 'Technology', plural: 'Technologies' },
              admin: { description: 'Flutter, Node.js, Firebase, Modbus RTU...' },
              fields: [{ name: 'tech', type: 'text', required: true }],
            },
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              admin: { description: 'Card image. Around 800x600.' },
            },
          ],
        },

        // ===== FULL PAGE =====
        {
          label: 'Full Page',
          fields: [
            {
              type: 'collapsible',
              label: 'Case study content',
              admin: {
                initCollapsed: false,
                condition: (data) => isFullPage(data),
                description: 'Only used when Display Type is set to Full case study page.',
              },
              fields: [
                {
                  name: 'coverImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Banner image at the top of the page.' },
                },
                {
                  name: 'problem',
                  type: 'richText',
                  admin: {
                    description:
                      'What was broken or missing before us. Keep it to two paragraphs.',
                  },
                },
                {
                  name: 'solution',
                  type: 'richText',
                  admin: { description: 'What we built and how we approached it.' },
                },
                {
                  name: 'pullQuote',
                  type: 'textarea',
                  admin: {
                    description:
                      'One striking line that breaks up the middle of the article. Optional — the section disappears if empty.',
                  },
                },
                {
                  name: 'keyFeatures',
                  type: 'array',
                  labels: { singular: 'Feature', plural: 'Features' },
                  fields: [
                    { name: 'heading', type: 'text', required: true },
                    { name: 'detail', type: 'textarea' },
                  ],
                },
                {
                  name: 'metrics',
                  type: 'array',
                  labels: { singular: 'Result', plural: 'Results' },
                  admin: {
                    description:
                      'Only real, verifiable numbers. Leave empty if you do not have any — the section disappears rather than showing placeholders.',
                  },
                  fields: [
                    { name: 'value', type: 'text', required: true },
                    { name: 'label', type: 'text', required: true },
                  ],
                },
                {
                  name: 'gallery',
                  type: 'array',
                  labels: { singular: 'Screenshot', plural: 'Screenshots' },
                  fields: [
                    { name: 'image', type: 'upload', relationTo: 'media', required: true },
                    { name: 'caption', type: 'text' },
                  ],
                },
                {
                  name: 'links',
                  type: 'array',
                  labels: { singular: 'Link', plural: 'Links' },
                  fields: [
                    {
                      name: 'label',
                      type: 'select',
                      required: true,
                      options: [
                        { label: 'Google Play', value: 'play-store' },
                        { label: 'App Store', value: 'app-store' },
                        { label: 'Live Website', value: 'website' },
                      ],
                    },
                    { name: 'url', type: 'text', required: true },
                  ],
                },
              ],
            },

            // Client-story-only fields
            {
              type: 'collapsible',
              label: 'Client details',
              admin: {
                initCollapsed: false,
                condition: (data) => isClientStory(data) && isFullPage(data),
              },
              fields: [
                {
                  name: 'engagementLength',
                  type: 'text',
                  admin: { description: 'Example: 6 weeks, or Ongoing since Jan 2026.' },
                },
                {
                  name: 'testimonial',
                  type: 'group',
                  admin: {
                    description: 'Only use a real quote you have permission to publish.',
                  },
                  fields: [
                    { name: 'quote', type: 'textarea' },
                    { name: 'author', type: 'text' },
                    { name: 'role', type: 'text' },
                  ],
                },
              ],
            },
          ],
        },

        // ===== SEO =====
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              admin: { description: 'Blank uses the project title.' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              admin: { description: 'Blank uses the summary.' },
            },
          ],
        },
      ],
    },
  ],
}
