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
    <main className="min-h-screen bg-canvas">
      <Navbar />

      <article className="pt-32 md:pt-40 pb-24">
        <div className="container-air max-w-[920px]">
          <Link href="/blog" className="inline-flex items-center gap-2 text-caption text-muted focus-ring rounded-sm mb-8">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All writing
          </Link>

          {post.category && (
            <span className="eyebrow">
              <span className="dot" />
              {post.category}
            </span>
          )}

          <h1 className="text-display-xl text-ink mt-7 max-w-3xl">
            {post.title}
          </h1>

          <div className="text-caption text-muted mt-5">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          {post.featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden my-14 bg-surface-soft border border-hairline">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-normal prose-headings:text-ink
              prose-p:text-body prose-p:leading-relaxed
              prose-a:text-link prose-a:no-underline
              prose-strong:text-ink
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-blockquote:border-l-2 prose-blockquote:border-link prose-blockquote:pl-6 prose-blockquote:text-ink
              prose-code:text-link prose-code:bg-surface-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-sm
              prose-img:rounded-md prose-img:border prose-img:border-hairline"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </article>

      <Footer />
    </main>
  );
}
