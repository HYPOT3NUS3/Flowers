import { getInstagramFeed } from "@/lib/instagram/feed";
import { ProductImage } from "@/components/ui/product-image";

export async function InstagramGrid() {
  const tiles = await getInstagramFeed();
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {tiles.slice(0, 8).map((tile) => (
        <a key={tile.id} href={tile.href} target="_blank" rel="noreferrer" className="aspect-square overflow-hidden border border-[var(--border)] bg-porcelain">
          <ProductImage src={tile.image} alt={tile.alt} />
        </a>
      ))}
    </div>
  );
}
