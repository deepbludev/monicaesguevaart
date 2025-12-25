/**
 * Available medium options for paintings and collections.
 * Edit this file to add, remove, or modify medium options.
 */
export const MEDIUM_OPTIONS = [
  'Acrylic on canvas',
  'Acrylic on round canvas',
  'Acrylic dyptich',
  'Watercolor',
] as const

export type Medium = (typeof MEDIUM_OPTIONS)[number]
