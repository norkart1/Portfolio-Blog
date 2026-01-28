"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, PlusCircle, List, Activity, User, LogOut, Loader2, BookOpen, Eye, Users, Shield, Clock, PenTool, Trash2, Search, Globe, ChevronDown, LayoutGrid } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "category", icon: LayoutGrid, label: "Category" },
    { id: "add", icon: PlusCircle, label: "Add Post" },
    { id: "posts", icon: List, label: "My Posts" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24">
      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto p-6">
        {activeTab === "home" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
              <Home className="h-4 w-4" />
              Dashboard Overview
            </div>

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
          </div>
        )}

        {activeTab === "add" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
              <PlusCircle className="h-4 w-4" />
              Create New Post
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6 text-left">
              <input type="text" placeholder="Post Title" className="w-full p-5 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-lg" />
              <textarea placeholder="Write your content here..." rows={12} className="w-full p-5 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 resize-none text-lg"></textarea>
              <button className="w-full py-5 bg-[#C24E00] text-white font-bold rounded-2xl shadow-xl shadow-orange-900/10 hover:opacity-95 transition-all text-lg">
                Publish Post
              </button>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
              <List className="h-4 w-4" />
              My Blog Posts
            </div>

            {/* Search and Filters */}
            <section className="px-4 mb-10">
              <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
                {/* Compact Search */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full bg-white border border-gray-100 rounded-2xl py-3 pl-11 pr-4 text-sm text-gray-600 focus:ring-2 focus:ring-[#C24E00]/5 focus:border-[#C24E00]/20 shadow-sm outline-none transition-all"
                  />
                </div>

                {/* Compact Filters */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm shrink-0">
                    <Globe className="h-4 w-4 text-[#C24E00]" />
                    <span>EN</span>
                    <ChevronDown className="h-3 w-3 text-gray-400" />
                  </button>
                  
                  <div className="flex items-center gap-1 bg-white border border-gray-100 p-1 rounded-2xl shadow-sm overflow-hidden">
                    {["ALL", "ARTICLE", "POEM"].map((cat) => (
                      <button
                        key={cat}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-tighter transition-all ${
                          cat === "ALL"
                            ? "bg-[#C24E00] text-white"
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

            <div className="max-w-4xl mx-auto space-y-8 text-left pb-12 px-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-all">
                  {/* Blog Thumbnail */}
                  <div className="relative w-full sm:w-48 h-48 shrink-0 overflow-hidden rounded-[2rem] bg-gray-50">
                    <img 
                      src={`https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop`} 
                      alt="Post thumbnail"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Blog Content Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#FFF9F2] text-[#A16207] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          Article
                        </span>
                        <span className="text-gray-300 text-xs">•</span>
                        <span className="text-gray-400 text-xs font-medium">5 min read</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#C24E00] transition-colors line-clamp-2 mb-3">
                        How to build a professional Next.js application from scratch - Part {i}
                      </h4>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        Learn the best practices for building scalable React applications using the latest Next.js features and modern web development tools.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-[#C24E00] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-900/20">
                          A
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-none">Admin</p>
                          <p className="text-[10px] text-gray-400 mt-1">Jan 28, 2026</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="h-10 w-10 flex items-center justify-center bg-gray-50 text-blue-600 rounded-2xl hover:bg-blue-50 transition-colors" title="Edit">
                          <PenTool className="h-5 w-5" />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center bg-gray-50 text-red-600 rounded-2xl hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Status tab logic removed */}
        
        {activeTab === "profile" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
              <User className="h-4 w-4" />
              Admin Profile
            </div>
            <div className="bg-white p-10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 text-center">
              <div className="h-32 w-32 bg-[#C24E00] rounded-[2.5rem] mx-auto flex items-center justify-center text-white text-4xl font-bold mb-6 shadow-2xl shadow-orange-900/20">
                {session.user?.name?.[0]}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{session.user?.name}</h3>
              <p className="text-lg text-gray-500 mb-8">{session.user?.email}</p>
              <div className="pt-8 border-t border-gray-100 space-y-4">
                <button className="w-full py-4 bg-gray-50 text-gray-700 font-bold rounded-2xl hover:bg-gray-100 transition-colors text-lg">
                  Edit Profile
                </button>
                <button onClick={() => signOut()} className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 transition-colors text-lg">
                  Logout Session
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Footer Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 p-2 z-20">
        <nav className="flex justify-between items-center px-2 py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center justify-center h-14 w-14 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#C24E00] text-white shadow-lg shadow-orange-900/20 scale-105" 
                    : "text-[#333333] hover:bg-gray-50"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
