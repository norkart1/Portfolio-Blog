"use client";

import { useState } from "react";
import Portfolio from "@/components/Portfolio";
import Blogs from "@/components/Blogs";
import Socials from "@/components/Socials";

import { Home, BookOpen, User } from "lucide-react";

export default function BlogHome() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 lg:flex lg:flex-row flex-col">
      <main className="flex-1 pb-32 lg:pb-0 lg:pl-24">
        {activeTab === "home" && <Portfolio />}
        {activeTab === "blogs" && <Blogs />}
        {activeTab === "socials" && <Socials />}
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md lg:bottom-auto lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:w-20 lg:max-w-none bg-white border border-gray-100 rounded-2xl lg:rounded-3xl shadow-xl p-1.5 z-50">
        <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-center lg:gap-8 px-1">
          <button 
            onClick={() => setActiveTab("home")}
            className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${activeTab === "home" ? "bg-[#D1510A] text-white shadow-md" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <Home className="h-5 w-5" />
          </button>
          
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`flex items-center justify-center p-3.5 rounded-xl transition-all duration-200 ${activeTab === "blogs" ? "bg-[#D1510A] text-white shadow-md" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <div className={`h-6 w-6 rounded-lg overflow-hidden border border-gray-100 shadow-sm ${activeTab === 'blogs' ? 'brightness-110' : 'grayscale opacity-70'}`}>
              <img src="/logo.png" alt="Blogs" className="w-full h-full object-cover" />
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab("socials")}
            className={`flex items-center justify-center p-3 rounded-xl transition-all duration-200 ${activeTab === "socials" ? "bg-[#D1510A] text-white shadow-md" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"}`}
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}
