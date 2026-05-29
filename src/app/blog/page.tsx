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
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <section className="pt-28 md:pt-32 pb-12">
        <div className="container-air">
          <div className="relative overflow-hidden rounded-lg bg-surface-dark-elevated text-on-dark min-h-[360px] p-8 md:p-12">
            <div className="absolute inset-y-0 right-0 w-[58%] rainbow-stripes opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-surface-dark-elevated via-surface-dark-elevated/88 to-transparent" />
            <div className="relative z-10 max-w-2xl">
              <span className="eyebrow !text-white/75">
                <span className="dot !bg-white" />
                Writing
              </span>
              <h1 className="text-display-xl text-white mt-7">
                Field notes from the studio.
              </h1>
              <p className="text-label-md text-white/78 mt-5 max-w-lg leading-[1.45]">
                Practical notes on product design, websites, launches, and the
                decisions behind the work we ship.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-air pt-12">
        <div className="container-air">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-hairline bg-surface-soft p-12 text-center">
              <p className="text-label-md text-body">
                {isConfigured
                  ? "No posts yet. Check back soon."
                  : "Blog is not configured for this environment."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: BlogPost, index) => (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug || post.id}
                  className={`article-card rounded-md border border-hairline bg-canvas p-4 ${
                    index % 3 === 1 ? "md:translate-y-8" : ""
                  }`}
                >
                  {post.featuredImage && (
                    <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-surface-soft">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="pt-5">
                    {post.category && (
                      <span className="text-caption text-muted uppercase">
                        {post.category}
                      </span>
                    )}
                    <h2 className="text-title-sm text-ink mt-3">
                      {post.title}
                    </h2>
                    <p className="text-body-md text-body mt-3 line-clamp-3 leading-[1.55]">
                      {post.metaDescription}
                    </p>
                    <div className="text-caption text-muted mt-5">
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
      </section>

      <Footer />
    </main>
  );
}
