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

const MASSBLOG_URL = process.env.MASSBLOG_URL;
const MASSBLOG_API = process.env.MASSBLOG_API;

if (!MASSBLOG_URL || !MASSBLOG_API) {
  console.warn("Missing Massblogger environment variables");
}

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${MASSBLOG_URL}/api/blog?apiKey=${MASSBLOG_API}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const data = await res.json();
    
    // Filter out future scheduled posts
    const now = new Date();
    return data.filter((post: BlogPost) => {
      if (!post.scheduleDate) return true;
      return new Date(post.scheduleDate) <= now;
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
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
