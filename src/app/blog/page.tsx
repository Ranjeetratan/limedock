import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts, BlogPost } from "@/lib/massblogger";

export const revalidate = 60;

export const metadata = {
  title: "Blog | LimeDock",
  description: "Insights, updates, and stories from the LimeDock team.",
};

export default async function BlogPage() {
  const isConfigured = Boolean(
    process.env.MASSBLOG_API ?? process.env.NEXT_PUBLIC_MASSBLOG_API
  );
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      <div className="flex-grow pt-40 md:pt-44 pb-24 px-6 max-w-[1200px] mx-auto w-full">
        <div className="mb-16 max-w-3xl">
          <span className="eyebrow mb-5">
            <span className="dot" />
            Writing
          </span>
          <h1 className="font-display text-display-xl text-ink mt-5">
            Field notes
            <br />
            <span className="text-ink-muted">from the studio.</span>
          </h1>
          <p className="text-subhead text-ink-muted mt-5 max-w-2xl">
            Updates, opinions, and lessons from inside the projects we ship.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-20 rounded-[20px] bg-surface-1 border border-hairline text-center">
            <p className="text-body-lg text-ink-muted">
              {isConfigured
                ? "No posts yet — check back soon."
                : "Blog is not configured for this environment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post: BlogPost) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug || post.id}
                className="group flex flex-col rounded-[24px] bg-surface-1 border border-hairline overflow-hidden lift"
              >
                {post.featuredImage && (
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-surface-2">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3 p-6">
                  {post.category && (
                    <span className="text-caption text-ink-muted bg-surface-2 border border-hairline w-fit px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}

                  <h2 className="font-display text-[22px] tracking-[-0.025em] leading-tight text-ink">
                    {post.title}
                  </h2>

                  <p className="text-body text-ink-muted leading-relaxed line-clamp-3">
                    {post.metaDescription}
                  </p>

                  <div className="text-caption text-ink-muted mt-2">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
