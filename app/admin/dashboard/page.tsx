"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Home, PlusCircle, List, Activity, User, LogOut, Loader2, BookOpen, Eye, Users } from "lucide-react";

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
    { id: "add", icon: PlusCircle, label: "Add Post" },
    { id: "posts", icon: List, label: "My Posts" },
    { id: "status", icon: Activity, label: "Status" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-24">
      {/* Top Header */}
      <header className="px-6 py-6 bg-white border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => signOut()}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-2xl mx-auto p-6">
        {activeTab === "home" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-gray-500 mt-2">Welcome back, {session.user?.name}. Here's what's happening.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Total Posts</h3>
                  <p className="text-3xl font-bold text-gray-900">24</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Total Views</h3>
                  <p className="text-3xl font-bold text-gray-900">8.5k</p>
                </div>
                <div className="p-3 bg-green-50 rounded-xl text-green-600">
                  <Eye className="h-6 w-6" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-1">Active Users</h3>
                  <p className="text-3xl font-bold text-gray-900">12</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "add" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Create New Post</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6">
              <input type="text" placeholder="Post Title" className="w-full p-5 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-lg" />
              <textarea placeholder="Write your content here..." rows={12} className="w-full p-5 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 resize-none text-lg"></textarea>
              <button className="w-full py-5 bg-[#C24E00] text-white font-bold rounded-2xl shadow-xl shadow-orange-900/10 hover:opacity-95 transition-all text-lg">
                Publish Post
              </button>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Your Posts</h2>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">How to build a Next.js app {i}</h4>
                    <p className="text-sm text-gray-400 mt-2">Published on Jan 28, 2026 • 120 views</p>
                  </div>
                  <button className="text-base text-blue-600 font-bold px-6 py-2 hover:bg-blue-50 rounded-xl transition-colors">Edit</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "status" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">System Status</h2>
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-lg font-medium">Database Connection</span>
                <span className="flex items-center text-green-600 font-bold gap-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-lg font-medium">API Server</span>
                <span className="flex items-center text-green-600 font-bold gap-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-lg font-medium">Uptime</span>
                <span className="text-gray-900 font-bold text-lg">99.9%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Admin Profile</h2>
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
