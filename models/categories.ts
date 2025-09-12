export const categories = [
  "Red Flowers",
  "Yellow Flowers",
  "Pink Flowers",
  "Bushy Flowers",
  "Climbing Flowers",
  "Bulb Flowers",
  "Perennial Flowers",
  "Annual Flowers",
] as const

export type Category = (typeof categories)[number]
