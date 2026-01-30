"use client";

import { useState } from "react";
import Portfolio from "@/components/Portfolio";
import Blogs from "@/components/Blogs";
import Socials from "@/components/Socials";

import { Home, BookOpen, User } from "lucide-react";

export default function BlogHome() {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 flex flex-col">
      <main className="flex-1 pb-32">
        {activeTab === "home" && <Portfolio />}
        {activeTab === "blogs" && <Blogs />}
        {activeTab === "socials" && <Socials />}
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/80 backdrop-blur-md border border-gray-100 rounded-full shadow-2xl p-2 z-50">
        <div className="flex items-center justify-around px-2">
          <button 
            onClick={() => setActiveTab("home")}
            className={`flex items-center justify-center p-4 rounded-full transition-all duration-300 ${activeTab === "home" ? "bg-[#D1510A] text-white shadow-lg scale-110" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <Home className="h-6 w-6" />
          </button>
          
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center justify-center p-5 rounded-full transition-all duration-300 ${activeTab === "blogs" ? "bg-[#D1510A] text-white shadow-lg shadow-orange-900/20 scale-110" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <BookOpen className="h-7 w-7" />
          </button>
          
          <button 
            onClick={() => setActiveTab("socials")}
            className={`flex items-center justify-center p-4 rounded-full transition-all duration-300 ${activeTab === "socials" ? "bg-[#D1510A] text-white shadow-lg scale-110" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </nav>
    </div>
  );
}
