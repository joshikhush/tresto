import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

/**
 * Rebuilds only the pages affected by this edit.
 * Runs inside the Next.js request context when triggered from the admin panel.
 */
export const revalidateCaseStudy: CollectionAfterChangeHook = ({ doc, previousDoc }) => {
  revalidatePath('/work')

  if (doc?.slug) {
    revalidatePath(`/work/${doc.slug}`)
  }

  // If the slug changed, the old URL needs clearing too.
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    revalidatePath(`/work/${previousDoc.slug}`)
  }

  return doc
}

export const revalidateCaseStudyDelete: CollectionAfterDeleteHook = ({ doc }) => {
  revalidatePath('/work')
  if (doc?.slug) revalidatePath(`/work/${doc.slug}`)
  return doc
}
