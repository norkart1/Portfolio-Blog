'use client';

import { useEffect, useState, use } from 'react';
import { ChevronLeft, Calendar, User, Clock, Heart, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/posts?id=${resolvedParams.id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching post:', err);
        setLoading(false);
      });
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C24E00]"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link href="/" className="px-6 py-3 bg-[#C24E00] text-white rounded-full font-bold">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 pt-24">
        {/* Featured Image */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-xl mb-8 aspect-square md:aspect-video">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 bg-orange-50 text-[#C24E00] text-[10px] font-black uppercase tracking-widest rounded-full">
            {post.category?.name || 'Article'}
          </span>
          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-[1.1] ${
          post.language === 'ar' ? 'font-rubik text-right' : 'font-anek'
        }`}>
          {post.title}
        </h1>

        {/* Author Card */}
        <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl mb-12 border border-gray-100">
          <div className="w-12 h-12 rounded-2xl bg-[#C24E00] flex items-center justify-center text-white font-black text-xl">
            {post.author?.[0] || 'A'}
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">{post.author || 'Admin'}</p>
            <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime || '5 min'} read
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <article 
          className={`prose prose-lg max-w-none text-gray-700 leading-relaxed ${
            post.language === 'ar' ? 'font-rubik text-right rtl' : 'font-anek'
          }`}
          style={{ direction: post.language === 'ar' ? 'rtl' : 'ltr' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  );
}
