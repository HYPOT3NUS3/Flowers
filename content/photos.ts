// Every photograph on the site lives in /public/photos under a fixed file name.
// To use your own photo: save it over the file with the SAME name (JPG). No code change needed.
// Current files are temporary: AI-generated images and Wikimedia Commons stand-ins.
// See public/photos/README.md for the list and the sizes that look best.

export const photos = {
  hero: "/photos/hero.jpg",
  weddings: "/photos/weddings.jpg",
  studio: "/photos/studio.jpg",
  services: {
    "premium-collections": "/photos/service-bouquets.jpg",
    "wedding-floristry": "/photos/weddings.jpg",
    "marriage-proposals": "/photos/service-proposals.jpg",
    "events-workshops": "/photos/service-events.jpg"
  } as Record<string, string>
} as const;

/** Product photo for a product slug: /photos/products/<slug>.jpg */
export const productPhoto = (slug: string) => `/photos/products/${slug}.jpg`;
