"use client";

import { useState } from "react";
import Portfolio from "@/components/Portfolio";
import Blogs from "@/components/Blogs";
import Socials from "@/components/Socials";

export default function BlogHome() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900 pb-24">
      <main>
        {activeTab === "home" && <Portfolio />}
        {activeTab === "blogs" && <Blogs />}
        {activeTab === "socials" && <Socials />}
      </main>

      {/* Persistent Navigation */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl p-2 z-50">
        <div className="flex items-center justify-around px-2 py-1">
          <button 
            onClick={() => setActiveTab("home")}
            className={`p-3 rounded-2xl transition-all ${activeTab === "home" ? "bg-[#D1510A] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
          >
            <span className="font-bold text-sm px-2">Home</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`p-3 rounded-2xl transition-all ${activeTab === "blogs" ? "bg-[#D1510A] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
          >
            <span className="font-bold text-sm px-2">Blogs</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("socials")}
            className={`p-3 rounded-2xl transition-all ${activeTab === "socials" ? "bg-[#D1510A] text-white shadow-lg" : "text-gray-400 hover:text-gray-600"}`}
          >
            <span className="font-bold text-sm px-2">Socials</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
