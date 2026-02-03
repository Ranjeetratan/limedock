export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage: string;
  content?: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  scheduleDate?: string;
}

const MASSBLOG_URL = process.env.MASSBLOG_URL ?? "https://www.massblogger.com";
const MASSBLOG_API =
  process.env.MASSBLOG_API ?? process.env.NEXT_PUBLIC_MASSBLOG_API;

export async function getPosts(): Promise<BlogPost[]> {
  if (!MASSBLOG_API) return [];

  try {
    const res = await fetch(`${MASSBLOG_URL}/api/blog?apiKey=${MASSBLOG_API}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const data = await res.json();
    const posts: BlogPost[] = Array.isArray(data) ? data : [];

    const now = new Date();
    return posts.filter((post) => {
      if (!post?.scheduleDate) return true;
      const schedule = new Date(post.scheduleDate);
      if (Number.isNaN(schedule.getTime())) return true;
      return schedule <= now;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  if (!MASSBLOG_API) return null;

  try {
    const res = await fetch(
      `${MASSBLOG_URL}/api/blog?apiKey=${MASSBLOG_API}&slug=${slug}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}
