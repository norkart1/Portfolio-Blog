'use client';

import React, { useEffect, useState } from 'react';
import { Search, Languages, Loader2, BookOpen, Heart } from "lucide-react";
import Link from 'next/link';

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).toUpperCase();
  };

  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "ALL" || post.category?.name?.toUpperCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      {/* Header Section */}
      <section className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFF9F2] border border-[#E5D4C0] rounded-full text-[#C24E00] font-bold text-xs uppercase tracking-wider shadow-sm">
          <BookOpen className="h-4 w-4" />
          BLOGS
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mb-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-[#F5F5F5] border-none rounded-2xl py-3.5 pl-12 pr-4 text-gray-600 focus:ring-2 focus:ring-[#C24E00]/10 outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
              <Languages className="h-4 w-4 text-[#C24E00]" />
              All Languages
            </button>
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeFilter === "ALL" ? "bg-white border border-gray-200 shadow-sm" : "text-gray-500"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setActiveFilter("ARTICLE")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeFilter === "ARTICLE" ? "bg-white border border-gray-200 shadow-sm" : "text-gray-500"
                }`}
              >
                ARTICLE
              </button>
              <button
                onClick={() => setActiveFilter("POEM")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap ${
                  activeFilter === "POEM" ? "bg-white border border-gray-200 shadow-sm" : "text-gray-500"
                }`}
              >
                POEM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <div className="space-y-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-[#C24E00]" />
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post._id}`} className="block group">
              <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                {/* Meta Info */}
                <div className={`flex items-center gap-2 mb-4 text-[10px] font-bold tracking-widest uppercase ${
                  post.language === 'ar' ? 'font-rubik' : 'font-anek'
                }`}>
                  <span className="text-[#C24E00]">
                    {post.language === "en" ? "ENGLISH" : post.language?.toUpperCase() || "ENGLISH"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400">
                    {formatDate(post.createdAt)}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className={`font-bold text-3xl mb-4 text-gray-900 leading-tight ${
                  post.language === 'ar' ? 'font-rubik' : 'font-anek'
                }`}>
                  {post.title}
                </h3>
                
                {/* Content Preview */}
                <div 
                  className={`text-gray-500 text-base leading-relaxed line-clamp-4 mb-8 prose prose-sm max-w-none ${
                    post.language === 'ar' ? 'font-rubik text-right rtl' : 'font-anek'
                  }`}
                  style={{ direction: post.language === 'ar' ? 'rtl' : 'ltr' }}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Divider */}
                <div className="h-px bg-gray-50 w-full mb-6"></div>
                
                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-sm text-gray-900 leading-tight">{post.author}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.readTime || '5 min'}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-full shadow-sm text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs font-bold">{post.likes || 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 italic text-center py-20">No blog posts found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
