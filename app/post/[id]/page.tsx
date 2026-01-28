"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Clock, User, Loader2, Calendar } from "lucide-react";
import Link from "next/link";

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          throw new Error("Post not found");
        }
        const data = await res.json();
        setPost(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin h-10 w-10 text-[#C24E00]" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/" className="text-[#C24E00] font-medium hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-30 border-b border-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="text-xl font-bold tracking-tight">Portfolio<span className="text-[#C24E00]">Blog</span></div>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#FFF9F2] text-[#A16207] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              {post.category?.name || "Uncategorized"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1 text-gray-500 text-sm">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-[#C24E00] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-900/20">
              {post.author[0]}
            </div>
            <div>
              <p className="font-bold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </p>
            </div>
          </div>
        </div>

        {post.image && (
          <div className="rounded-[2rem] overflow-hidden mb-10 shadow-lg">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none"
          style={{ 
            textAlign: (post.textAlign as any) || "left",
            color: post.textColor || "#333333"
          }}
        >
          <p className="whitespace-pre-wrap text-lg leading-relaxed">
            {post.content}
          </p>
        </div>
      </article>
    </div>
  );
}
