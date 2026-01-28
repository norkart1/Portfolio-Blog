"use client";

import { useState, useEffect } from "react";
import { Search, Globe, ChevronDown, Book, Shield, BookOpen, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

export default function BlogHome() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
    const matchesFilter = activeFilter === "ALL" || post.category?.name === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
      {/* Navigation for Desktop */}
      <header className="hidden md:flex items-center justify-between px-10 py-6 border-b border-gray-50 sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="text-xl font-bold tracking-tight">Portfolio<span className="text-[#C24E00]">Blog</span></div>
        <nav className="flex items-center gap-8">
           <a href="#" className="text-sm font-bold text-gray-900">Home</a>
           <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">Articles</a>
           <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">About</a>
           <a href="/admin/login" className="px-5 py-2.5 bg-[#C24E00] text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-900/10 hover:opacity-90 transition-all">Admin</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-12 md:pt-24 pb-12 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
          <Shield className="h-4 w-4" />
          Organizational Structure
        </div>
        <h1 className="text-lg md:text-xl text-[#666666] max-w-2xl mx-auto leading-relaxed font-medium mb-12">
          Meet the dedicated scholars and board members working tirelessly to uphold our mission of excellence.
        </h1>

        {/* Stats Section */}
        <div className="max-w-xl mx-auto grid grid-cols-2 gap-4 bg-white p-4 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 mb-16">
          <div className="bg-[#FDFDFD] p-6 rounded-[2rem] flex items-center gap-4 text-left">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <BookOpen className="h-6 w-6 text-[#A16207]" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">{posts.length}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Published</p>
            </div>
          </div>
          <div className="bg-[#FDFDFD] p-6 rounded-[2rem] flex items-center gap-4 text-left">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <Clock className="h-6 w-6 text-[#A16207]" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">0</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Pending</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="px-6 mb-12">
        <div className="max-w-xl mx-auto bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-6">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-[#F8F9FA] border-none rounded-2xl py-4 pl-12 pr-4 text-gray-600 focus:ring-2 focus:ring-[#C24E00]/10 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-3 border border-gray-100 rounded-2xl text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              <Globe className="h-5 w-5 text-[#C24E00]" />
              All Languages
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
            
            <div className="flex items-center gap-2 bg-[#F8F9FA] p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveFilter("ALL")}
                className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all ${
                  activeFilter === "ALL"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                ALL
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all ${
                    activeFilter === cat.name
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
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
      <section className="px-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin h-10 w-10 text-[#C24E00]" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            <Link href={`/post/${filteredPosts[0]._id}`} className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/3] shadow-sm md:col-span-2 lg:col-span-2">
              <img
                src={filteredPosts[0].image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"}
                alt={filteredPosts[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6">
                <div className="bg-[#FFB800] text-gray-900 font-bold text-[10px] tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg">
                  Featured {filteredPosts[0].category?.name}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h2 className="text-2xl md:text-3xl font-bold leading-tight">{filteredPosts[0].title}</h2>
                <div className="flex items-center gap-3 mt-4 text-sm font-medium opacity-90">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm uppercase">
                    {filteredPosts[0].author[0]}
                  </div>
                  <span>By {filteredPosts[0].author}</span>
                  <span className="opacity-50">•</span>
                  <span>{filteredPosts[0].readTime}</span>
                </div>
              </div>
            </Link>
            
            {/* Other Posts */}
            {filteredPosts.slice(1).map((post) => (
              <Link href={`/post/${post._id}`} key={post._id} className="group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={post.title}
                  />
                </div>
                <div className="p-6">
                   <div className="flex items-center gap-2 mb-3">
                     <span className="text-[#A16207] text-[10px] font-black uppercase tracking-widest">
                       {post.category?.name}
                     </span>
                   </div>
                   <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
                   <p className="text-gray-500 text-sm line-clamp-2">{post.content}</p>
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
    </div>
  );
}
