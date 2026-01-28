'use client';

import React, { useEffect, useState } from 'react';
import { Search, Languages, Loader2, BookOpen } from "lucide-react";

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
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-[#C24E00]" />
          </div>
        ) : filteredPosts.length > 0 ? (
          filteredPosts.map((post: any) => (
            <div key={post._id} className="relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4">
                <div className="bg-[#FFB800] text-black font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-lg shadow-sm">
                  FEATURED {post.category?.name?.toUpperCase() || 'ARTICLE'}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-2xl mb-2 text-gray-900 leading-tight">
                  {post.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center py-20">No blog posts found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
