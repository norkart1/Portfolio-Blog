'use client';

import React, { useEffect, useState } from 'react';
import { Search, Languages, Loader2, BookOpen, Heart, Share2, Eye, PenTool } from "lucide-react";
import Link from 'next/link';

const Blogs = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLanguage, setActiveLanguage] = useState("ALL");
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Fetch posts
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

    // Fetch categories
    fetch('/api/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error('Error fetching categories:', err));
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
    const matchesLanguage = activeLanguage === "ALL" || post.language?.toUpperCase() === activeLanguage;
    return matchesSearch && matchesFilter && matchesLanguage;
  });

  const languages = [
    { code: "ALL", name: "All Languages" },
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
    { code: "ML", name: "Malayalam" }
  ];

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

          <div className="flex items-center gap-3 relative z-[60]">
            <div className="relative">
              <select
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
                className="appearance-none flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm pr-10 outline-none bg-white cursor-pointer relative z-[70]"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <Languages className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C24E00] pointer-events-none z-[80]" />
            </div>
            
            <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-2 relative z-[70]">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveFilter("ALL");
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap relative z-[80] cursor-pointer ${
                  activeFilter === "ALL" ? "bg-[#D1510A] text-white shadow-md" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                ALL
              </button>
              {categories.map(cat => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveFilter(cat.name.toUpperCase());
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap relative z-[80] cursor-pointer ${
                    activeFilter === cat.name.toUpperCase() ? "bg-[#D1510A] text-white shadow-md" : "bg-white border border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
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
            <Link key={post._id} href={`/blog/${post._id}`} className="block group mb-12">
              <div className="bg-white rounded-3xl overflow-hidden transition-all duration-300 h-full flex flex-col">
                
                {/* Author Header */}
                <div className="flex items-center gap-4 p-4 border-b border-gray-50">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border border-gray-100 shadow-inner">
                    <PenTool className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight uppercase tracking-tight">
                      {post.author || "Hafiz Rashid Hussain"}
                    </h4>
                    <span className="text-xs text-gray-400 font-medium tracking-tight">
                      Editorial Contributor
                    </span>
                  </div>
                </div>

                {/* Main Image with Share Button */}
                <div className="relative aspect-video mx-4 mt-6 rounded-[2.5rem] overflow-hidden group/image shadow-sm">
                  <img 
                    src={post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute top-4 right-4 h-10 w-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-600 shadow-lg hover:bg-white transition-all active:scale-95"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6 pt-8 flex-1 flex flex-col items-center text-center">
                  {/* Title & Engagement Stats */}
                  <h3 className={`font-bold text-2xl mb-6 text-gray-900 leading-tight group-hover:text-[#C24E00] transition-colors ${
                    post.language === 'ar' ? 'font-rubik' : 'font-anek'
                  }`}>
                    {post.title}
                  </h3>
                  
                  {/* Footer Stats */}
                  <div className="flex items-center justify-center gap-8 w-full mt-auto text-gray-500 pb-2">
                    <div className="flex items-center gap-2 group/stat">
                      <Eye className="h-5 w-5 text-gray-400 group-hover/stat:text-[#D1510A] transition-colors" />
                      <span className="text-sm font-bold tracking-tight">{post.views || 11}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 group/stat">
                      <Heart className="h-5 w-5 text-gray-400 group-hover/stat:text-red-500 transition-colors" />
                      <span className="text-sm font-bold tracking-tight">{post.likes || 8}</span>
                    </div>
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
