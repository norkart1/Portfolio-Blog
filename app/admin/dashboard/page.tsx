"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, FileText, Settings, LogOut, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Blog Admin</h1>
        </div>
        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-600 rounded-lg">
            <LayoutDashboard className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <FileText className="h-5 w-5" />
            <span className="font-medium">Posts</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </a>
          <button 
            onClick={() => signOut()}
            className="w-full flex items-center space-x-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome, {session.user?.name}</h2>
            <p className="text-gray-600">Overview of your blog's performance</p>
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm">
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {session.user?.name?.[0]}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Posts</h3>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Views</h3>
            <p className="text-3xl font-bold text-gray-900">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Subscribers</h3>
            <p className="text-3xl font-bold text-gray-900">45</p>
          </div>
        </div>
      </div>
    </div>
  );
}
