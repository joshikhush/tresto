import type { Field } from 'payload'

const format = (val: string): string =>
  val
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

/**
 * Auto-generates a URL slug from another field (default: "title").
 * Editable in admin if you want a custom URL.
 */
export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Auto-filled from the title. This becomes the page URL.',
  },
  hooks: {
    beforeValidate: [
      ({ value, originalDoc, data }) => {
        if (typeof value === 'string' && value.length > 0) return format(value)
        const fallback = data?.[fieldToUse] || originalDoc?.[fieldToUse]
        if (fallback && typeof fallback === 'string') return format(fallback)
        return value
      },
    ],
  },
})
