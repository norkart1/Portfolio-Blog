"use client";

import { useState } from "react";
import { Search, Globe, ChevronDown, Book, Shield, BookOpen, Clock } from "lucide-react";

export default function BlogHome() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["ALL", "ARTICLE", "POEM"];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-12">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 text-center">
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
              <p className="text-2xl font-black text-gray-900 leading-none">12</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Published</p>
            </div>
          </div>
          <div className="bg-[#FDFDFD] p-6 rounded-[2rem] flex items-center gap-4 text-left">
            <div className="p-3 bg-white rounded-2xl shadow-sm">
              <Clock className="h-6 w-6 text-[#A16207]" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">4</p>
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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2 rounded-xl text-xs font-bold tracking-widest transition-all ${
                    activeFilter === cat
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Feed */}
      <section className="px-6 max-w-2xl mx-auto">
        <div className="relative group cursor-pointer overflow-hidden rounded-[2.5rem] bg-gray-100 aspect-[4/3] mb-8 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
            alt="Featured post"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6">
            <div className="bg-[#FFB800] text-gray-900 font-bold text-[10px] tracking-widest uppercase px-4 py-2 rounded-xl shadow-lg">
              Featured Article
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
            <h2 className="text-2xl font-bold leading-tight">Preserving Heritage: The Role of Scholars in Modern Times</h2>
            <div className="flex items-center gap-3 mt-4 text-sm font-medium opacity-90">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm uppercase">
                A
              </div>
              <span>By Admin</span>
              <span className="opacity-50">•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
