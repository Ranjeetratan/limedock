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
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <article className="flex-grow pt-32 pb-24 px-6 md:px-8 xl:px-[124px] max-w-[1000px] mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
             <Link href="/blog" className="text-gray-500 hover:text-black transition-colors text-sm font-bold uppercase tracking-wide">
                ← Back to Blog
             </Link>
             {post.category && (
               <>
                 <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                 <span className="text-sm font-bold text-[#E8E700] bg-black px-3 py-1 rounded-full">
                   {post.category}
                 </span>
               </>
             )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="text-gray-500 font-medium">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full aspect-[16/9] rounded-[32px] overflow-hidden mb-16 shadow-lg">
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
          className="prose prose-lg md:prose-xl max-w-none 
            prose-headings:font-bold prose-headings:text-foreground 
            prose-p:text-foreground/80 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-ul:list-disc prose-ul:pl-6
            prose-ol:list-decimal prose-ol:pl-6
            prose-blockquote:border-l-4 prose-blockquote:border-[#E8E700] prose-blockquote:pl-6 prose-blockquote:italic
            prose-img:rounded-2xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />
      </article>

      <Footer />
    </main>
  );
}
