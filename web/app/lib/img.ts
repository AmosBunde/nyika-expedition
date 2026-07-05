/** Unsplash CDN URL for a verified photo ID at the given width. */
export const img = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`
