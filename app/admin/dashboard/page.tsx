"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Home, PlusCircle, List, Activity, User, LogOut, Loader2, BookOpen, Eye, Users, Shield, Clock, PenTool, Trash2, Search, Globe, ChevronDown, LayoutGrid } from "lucide-react";

import RichTextEditor from "@/components/RichTextEditor";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("posts");

  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "", image: "", language: "en", textAlign: "left", textColor: "#333333", authorName: "", authorProfile: "" });
  const [activeLanguageFilter, setActiveLanguageFilter] = useState("ALL");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("ALL");

  const filteredPosts = posts.filter((post: any) => {
    const matchesCategory = activeCategoryFilter === "ALL" || post.category?.name?.toUpperCase() === activeCategoryFilter;
    const matchesLanguage = activeLanguageFilter === "ALL" || post.language?.toUpperCase() === activeLanguageFilter;
    return matchesCategory && matchesLanguage;
  });

  const languages = [
    { code: "ALL", name: "All Languages" },
    { code: "EN", name: "English" },
    { code: "AR", name: "Arabic" },
    { code: "ML", name: "Malayalam" }
  ];
  const [uploading, setUploading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    if (img.width !== 1080 || img.height !== 1080) {
      alert("Please upload an image with 1080x1080 dimensions only.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        setNewPost({ ...newPost, image: data.secure_url });
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (post: any) => {
    setEditingPostId(post._id);
    setNewPost({
      title: post.title,
      content: post.content,
      category: post.category?._id || post.category || "",
      image: post.image,
      language: post.language || "en",
      textAlign: post.textAlign || "left",
      textColor: post.textColor || "#333333",
      authorName: post.author || "",
      authorProfile: post.authorProfile || ""
    });
    setActiveTab("add");
  };

  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  const handlePublish = async () => {
    if (!newPost.title || !newPost.content || !newPost.category || !newPost.image) {
      alert("Please fill all fields and upload an image");
      return;
    }

    const url = editingPostId ? `/api/posts/${editingPostId}` : "/api/posts";
    const method = editingPostId ? "PATCH" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...newPost,
        author: newPost.authorName || session?.user?.name || "Admin",
        authorProfile: newPost.authorProfile,
        readTime: "5 min read",
        language: newPost.language
      }),
    });

    if (res.ok) {
      alert(editingPostId ? "Post updated successfully!" : "Post published successfully!");
      setNewPost({ title: "", content: "", category: "", image: "", language: "en", textAlign: "left", textColor: "#333333", authorName: "", authorProfile: "" });
      setEditingPostId(null);
      setActiveTab("posts");
      // Refresh posts list
      const postRes = await axios.get("/api/posts");
      setPosts(Array.isArray(postRes.data) ? postRes.data : []);
    }
  };

  const handleUpdateCategory = async (id: string) => {
    if (!editingName) return;
    const res = await fetch(`/api/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editingName }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCategories(categories.map(c => c._id === id ? updated : c));
      setEditingId(null);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories(categories.filter(c => c._id !== id));
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter(p => p._id !== id));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        try {
          const [catRes, postRes] = await Promise.all([
            axios.get("/api/categories"),
            axios.get("/api/posts")
          ]);
          setCategories(Array.isArray(catRes.data) ? catRes.data : []);
          setPosts(Array.isArray(postRes.data) ? postRes.data : []);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
        }
      }
    };

    if (status === "unauthenticated") {
      router.push("/admin/login");
    } else if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name");
      return;
    }
    try {
      console.log("Adding category:", newCategory.trim());
      const response = await axios.post("/api/categories", { name: newCategory.trim() });
      console.log("Server response:", response.data);
      if (response.data && response.data._id) {
        setCategories(prev => [...prev, response.data]);
        setNewCategory("");
      } else {
        alert("Server returned invalid data");
      }
    } catch (err: any) {
      console.error("Add category error:", err);
      const errorMsg = err.response?.data?.error || err.message || "Failed to add category";
      alert(errorMsg);
    }
  };

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
    <div className="min-h-screen bg-[#FDFDFD] pb-24 lg:pb-0 lg:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 p-6 fixed h-full z-30">
        <div className="mb-10 px-2">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Admin <span className="text-[#C24E00]">Panel</span></h2>
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? "bg-[#C24E00] text-white shadow-lg shadow-orange-900/20" 
                    : "text-[#333333] hover:bg-gray-50"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : "stroke-[1.8px]"}`} />
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="pt-6 border-t border-gray-100">
           <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-colors font-bold text-sm">
             <LogOut className="h-5 w-5" />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto w-full">
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
                  <p className="text-2xl font-black text-gray-900 leading-none">{posts.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Published</p>
                </div>
              </div>
              <div className="bg-[#FDFDFD] p-6 rounded-[2rem] flex items-center gap-4 text-left">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                  <LayoutGrid className="h-6 w-6 text-[#A16207]" />
                </div>
                <div>
                  <p className="text-2xl font-black text-gray-900 leading-none">{categories.length}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Categories</p>
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
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 space-y-6 text-left max-w-3xl mx-auto">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
                <input 
                  type="text" 
                  placeholder="Enter a catchy title" 
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 text-lg" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
                  <select 
                    value={newPost.language}
                    onChange={(e) => setNewPost({ ...newPost, language: e.target.value })}
                    className="w-full p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      onChange={handleImageUpload}
                      className="hidden" 
                      id="image-upload"
                      accept="image/*"
                    />
                    <label 
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full p-4 bg-[#F8F9FA] border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-orange-500/50 transition-colors"
                    >
                      {uploading ? (
                        <Loader2 className="animate-spin h-5 w-5 text-orange-500" />
                      ) : newPost.image ? (
                        <span className="text-green-600 font-medium">Image Uploaded!</span>
                      ) : (
                        <span className="text-gray-400 text-sm">Click to upload</span>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Author Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter author name" 
                    value={newPost.authorName}
                    onChange={(e) => setNewPost({ ...newPost, authorName: e.target.value })}
                    className="w-full p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Author Profile (Optional URL)</label>
                  <input 
                    type="text" 
                    placeholder="Enter profile image URL" 
                    value={newPost.authorProfile}
                    onChange={(e) => setNewPost({ ...newPost, authorProfile: e.target.value })}
                    className="w-full p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20" 
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-bold text-gray-700">Content</label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                      <input 
                        type="color" 
                        value={newPost.textColor}
                        onChange={(e) => setNewPost({ ...newPost, textColor: e.target.value })}
                        className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent p-0 overflow-hidden"
                        title="Text Color"
                      />
                    </div>
                    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                      {(['left', 'center', 'right', 'justify'] as const).map((align) => (
                        <button
                          key={align}
                          type="button"
                          onClick={() => setNewPost({ ...newPost, textAlign: align })}
                          className={`p-2 rounded-lg transition-all ${
                            newPost.textAlign === align 
                              ? "bg-white text-[#C24E00] shadow-sm" 
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          {align === 'left' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16"></path></svg>}
                          {align === 'center' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M7 12h10M4 18h16"></path></svg>}
                          {align === 'right' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M10 12h10M4 18h16"></path></svg>}
                          {align === 'justify' && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <RichTextEditor 
                  content={newPost.content}
                  onChange={(content) => setNewPost({ ...newPost, content })}
                  textAlign={newPost.textAlign}
                  textColor={newPost.textColor}
                />
              </div>

              <button 
                onClick={handlePublish}
                disabled={uploading}
                className="w-full py-5 bg-[#C24E00] text-white font-bold rounded-2xl shadow-xl shadow-orange-900/10 hover:opacity-95 transition-all text-lg disabled:opacity-50"
              >
                {uploading ? "Uploading Image..." : "Publish Post"}
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
                  <div className="relative z-50">
                    <select
                      value={activeLanguageFilter}
                      onChange={(e) => setActiveLanguageFilter(e.target.value)}
                      className="appearance-none flex items-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer outline-none pr-8"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.code}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                  </div>
                  
                  <div className="flex items-center gap-1 bg-white border border-gray-100 p-1 rounded-2xl shadow-sm overflow-hidden z-50">
                    <button
                      type="button"
                      onClick={() => setActiveCategoryFilter("ALL")}
                      className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-tighter transition-all cursor-pointer ${
                        activeCategoryFilter === "ALL"
                          ? "bg-[#C24E00] text-white"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      ALL
                    </button>
                    {categories.slice(0, 2).map((cat) => (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => setActiveCategoryFilter(cat.name.toUpperCase())}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black tracking-tighter transition-all cursor-pointer ${
                          activeCategoryFilter === cat.name.toUpperCase()
                            ? "bg-[#C24E00] text-white"
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

            <div className="max-w-4xl mx-auto space-y-8 text-left pb-12 px-2">
              {filteredPosts.map(post => (
                <div key={post._id} className="group flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-md transition-all">
                  {/* Blog Thumbnail */}
                  <div className="relative w-full sm:w-48 h-48 shrink-0 overflow-hidden rounded-[2rem] bg-gray-50">
                    <img 
                      src={post.image || `https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop`} 
                      alt="Post thumbnail"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Blog Content Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#FFF9F2] text-[#A16207] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                          {post.category?.name || "Uncategorized"}
                        </span>
                        <span className="text-gray-300 text-xs">•</span>
                        <span className="text-gray-400 text-xs font-medium">{post.readTime}</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#C24E00] transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h4>
                      <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-[#C24E00] flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-orange-900/20">
                          {post.author[0]}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-none">{post.author}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEdit(post)}
                          className="h-10 w-10 flex items-center justify-center bg-gray-50 text-blue-600 rounded-2xl hover:bg-blue-50 transition-colors" 
                          title="Edit"
                        >
                          <PenTool className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDeletePost(post._id)} className="h-10 w-10 flex items-center justify-center bg-gray-50 text-red-600 rounded-2xl hover:bg-red-50 transition-colors" title="Delete">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="text-center py-20 text-gray-400">No posts found. Start by creating one!</div>
              )}
            </div>
          </div>
        )}

        {activeTab === "category" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-[#F5E6D3] rounded-full text-[#A16207] font-bold text-xs mb-8 uppercase tracking-widest shadow-sm">
              <LayoutGrid className="h-4 w-4" />
              Manage Categories
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 mb-8 overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                  placeholder="New Category Name (e.g. Novels)" 
                  className="flex-1 p-4 bg-[#F8F9FA] border-none rounded-2xl outline-none focus:ring-2 focus:ring-orange-500/20 w-full text-gray-900" 
                />
                <button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddCategory();
                  }}
                  className="px-8 py-4 bg-[#C24E00] text-white font-bold rounded-2xl hover:opacity-95 active:scale-95 transition-all w-full sm:w-auto cursor-pointer relative z-50 flex items-center justify-center gap-2"
                >
                  <PlusCircle className="h-5 w-5" />
                  Add
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.filter(cat => cat && cat._id).map((cat) => (
                <div key={cat._id} className="bg-white p-5 rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center shadow-sm gap-3">
                  {editingId === cat._id ? (
                    <input 
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="flex-1 p-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-orange-500 w-full"
                    />
                  ) : (
                    <span className="font-bold text-gray-900 truncate max-w-[200px]">{cat.name}</span>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {editingId === cat._id ? (
                      <button 
                        onClick={() => handleUpdateCategory(cat._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setEditingId(cat._id); setEditingName(cat.name); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <PenTool className="h-5 w-5" />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteCategory(cat._id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
              {categories.length === 0 && (
                <p className="col-span-full text-gray-400 py-10">No categories found. Add one above!</p>
              )}
            </div>
          </div>
        )}
        
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

      {/* Floating Footer Menu (Mobile/Tablet only) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 p-2 z-20 lg:hidden">
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
