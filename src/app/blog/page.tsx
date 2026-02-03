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
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-6 md:px-8 xl:px-[124px] max-w-[1440px] mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-[80px] font-bold mb-6 tracking-tight leading-none text-foreground">
            Our <span className="text-gray-500">Blog</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Latest updates, thoughts, and insights from our team.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug || post.id}
                className="group flex flex-col gap-4 p-6 rounded-[32px] border-2 border-dashed border-black/10 hover:border-black/20 transition-all duration-300 bg-transparent"
              >
                {post.featuredImage && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="flex flex-col gap-2">
                  {post.category && (
                    <span className="text-sm font-bold text-[#E8E700] bg-black w-fit px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                  
                  <h2 className="text-2xl font-bold text-foreground leading-tight group-hover:text-gray-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-foreground/60 leading-relaxed line-clamp-3">
                    {post.metaDescription}
                  </p>
                  
                  <div className="text-sm text-gray-400 mt-2 font-medium">
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
