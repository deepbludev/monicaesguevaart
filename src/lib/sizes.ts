/**
 * Available size options for paintings.
 * Edit this file to add, remove, or modify size options.
 */
export const SIZE_OPTIONS = [
  '80x80 cm',
  '60x60 cm',
  '60x60 cm (round)',
  '40x80 cm',
  '50x100 cm',
  '90x60 cm',
  '92x65 cm',
  '66x93 cm',
  '92x73 cm',
  '100x40 cm',
] as const

export type Size = (typeof SIZE_OPTIONS)[number]
