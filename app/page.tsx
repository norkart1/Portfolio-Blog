"use client";

import { useState, useEffect } from "react";
import { Search, Languages, Loader2, Heart, Home, BookOpen, Users, Image, Mail } from "lucide-react";
import Link from "next/link";

export default function BlogHome() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState("archive");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/categories")
        ]);
        const [postsData, catsData] = await Promise.all([
          postsRes.json(),
          catsRes.json()
        ]);
        setPosts(Array.isArray(postsData) ? postsData : []);
        setCategories(Array.isArray(catsData) ? catsData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "ALL" || post.category?.name?.toUpperCase() === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 pb-24">
      {/* Header Section */}
      <section className="pt-10 pb-6 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#E5D4C0] rounded-full text-[#C24E00] font-bold text-xs mb-6 uppercase tracking-wider shadow-sm">
          <BookOpen className="h-4 w-4" />
          THE ARCHIVE
        </div>
        <p className="text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
          A curated collection of scholarly articles, poetry, and community insights.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="px-4 mb-8">
        <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
          {/* Search Input */}
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

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm">
              <Languages className="h-4 w-4 text-[#C24E00]" />
              All Languages
            </button>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                  activeFilter === "ALL"
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-700 bg-gray-100"
                }`}
              >
                ALL
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveFilter(cat.name?.toUpperCase())}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all ${
                    activeFilter === cat.name?.toUpperCase()
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-700 bg-gray-100"
                  }`}
                >
                  {cat.name?.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="px-4 max-w-lg mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-[#C24E00]" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {/* Featured Post */}
            <Link href={`/post/${filteredPosts[0]._id}`} className="block">
              <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] shadow-sm">
                <img
                  src={filteredPosts[0].image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                  alt={filteredPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-[#C24E00] text-white font-bold text-[10px] tracking-wider uppercase px-4 py-2 rounded-lg shadow-lg">
                    FEATURED {filteredPosts[0].category?.name?.toUpperCase()}
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Article Cards */}
            {filteredPosts.map((post) => (
              <Link href={`/post/${post._id}`} key={post._id} className="block">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* Post Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
                      className="w-full h-full object-cover"
                      alt={post.title}
                    />
                  </div>
                  
                  {/* Post Content */}
                  <div className="p-5">
                    {/* Meta Info */}
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <span className="text-[#C24E00] font-bold uppercase tracking-wide">
                        {post.language === "en" ? "ENGLISH" : post.language?.toUpperCase() || "ENGLISH"}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400 font-medium">
                        {formatDate(post.createdAt)}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-bold text-xl mb-3 leading-tight text-gray-900">
                      {post.title}
                    </h3>
                    
                    {/* Content Preview */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                      {post.content}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-400">{post.readTime}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm font-medium">{post.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-medium">
            No posts found matching your criteria.
          </div>
        )}
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-around">
          <button 
            onClick={() => setActiveNav("home")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              activeNav === "home" ? "text-[#C24E00]" : "text-gray-400"
            }`}
          >
            <Home className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setActiveNav("archive")}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all ${
              activeNav === "archive" 
                ? "bg-[#C24E00] text-white shadow-lg shadow-orange-900/20" 
                : "text-gray-400"
            }`}
          >
            <BookOpen className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setActiveNav("members")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              activeNav === "members" ? "text-[#C24E00]" : "text-gray-400"
            }`}
          >
            <Users className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setActiveNav("gallery")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              activeNav === "gallery" ? "text-[#C24E00]" : "text-gray-400"
            }`}
          >
            <Image className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setActiveNav("contact")}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              activeNav === "contact" ? "text-[#C24E00]" : "text-gray-400"
            }`}
          >
            <Mail className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}
