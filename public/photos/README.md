# Site photos: how to replace them

Every photo on the site is a file in this folder. To use your own photo, save it over the
file with **the same name**. Use JPG. No code change is needed.

If the old photo still shows, the dev server is serving a cached resized copy. Stop
`npm run dev`, delete the folder `.next/cache/images`, and start it again. A production
deploy rebuilds from scratch and is not affected.

The current files are temporary: AI-generated images and Wikimedia Commons stand-ins.
When you replace a Commons photo, also delete its name from the "Photos:" credit line in
`components/layout/footer.tsx`.

| File | Where it shows | Best shape |
|---|---|---|
| `hero.jpg` | Home, first screen (full height on phones) | Portrait, at least 1200 x 1500 |
| `weddings.jpg` | Home, weddings section + Weddings tile | Portrait, at least 1200 x 1500 |
| `studio.jpg` | Home, studio section | Landscape or portrait, at least 1200 wide |
| `service-bouquets.jpg` | Tile: Premium collections + Services page top | Portrait 4:5, at least 1000 wide |
| `service-proposals.jpg` | Home tile: Marriage proposals | Portrait 4:5, at least 1000 wide |
| `service-events.jpg` | Home tile: Events and workshops | Portrait 4:5, at least 1000 wide |
| `products/<slug>.jpg` | Product card + product page | Portrait 4:5, at least 1200 x 1500 |

Product file names match the product slug in `content/products/products.ts`
(for example `products/como-morning.jpg`).

Tips for photos that look professional: daylight from a window, no flash, the same
background and light for all product shots, flowers filling most of the frame.
