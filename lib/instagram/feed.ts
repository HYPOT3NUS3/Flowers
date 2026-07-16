import { instagramFallback } from "@/content/instagram";

export type InstagramTile = {
  id: string;
  image: string;
  href: string;
  alt: string;
};

export async function getInstagramFeed(): Promise<InstagramTile[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return instagramFallback;
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,caption,media_url,permalink,media_type&access_token=${token}`,
      { next: { revalidate: 1800 } }
    );

    if (!response.ok) return instagramFallback;

    const payload = (await response.json()) as {
      data?: { id: string; caption?: string; media_url?: string; permalink?: string; media_type?: string }[];
    };

    const tiles = (payload.data ?? [])
      .filter((item) => item.media_url && item.permalink && item.media_type !== "VIDEO")
      .slice(0, 9)
      .map((item) => ({
        id: item.id,
        image: item.media_url!,
        href: item.permalink!,
        alt: item.caption?.slice(0, 120) || "MUZA Instagram post"
      }));

    return tiles.length ? tiles : instagramFallback;
  } catch {
    return instagramFallback;
  }
}
