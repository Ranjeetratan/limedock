import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPost, getPosts } from "@/lib/massblogger";
import { Metadata } from "next";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.metaTitle || post.title} | LimeDock`,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-canvas flex flex-col">
      <Navbar />

      <article className="flex-grow pt-40 md:pt-44 pb-24 px-6 max-w-[860px] mx-auto w-full">
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-caption text-ink-muted hover:text-ink transition-colors mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All writing
          </Link>

          {post.category && (
            <span className="eyebrow mb-5">
              <span className="dot" />
              {post.category}
            </span>
          )}

          <h1 className="font-display text-display-xl text-ink mt-5 leading-[1.05]">
            {post.title}
          </h1>

          <div className="text-caption text-ink-muted mt-5">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-[24px] overflow-hidden mb-16 bg-surface-1 border border-hairline">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg prose-invert max-w-none
            prose-headings:font-semibold prose-headings:text-ink prose-headings:tracking-tight
            prose-p:text-ink-muted prose-p:leading-relaxed
            prose-a:text-accent-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-ink
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-blockquote:border-l-2 prose-blockquote:border-accent-blue prose-blockquote:pl-6 prose-blockquote:text-ink
            prose-code:text-accent-blue prose-code:bg-surface-1 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
            prose-img:rounded-2xl prose-img:border prose-img:border-hairline"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      <Footer />
    </main>
  );
}
