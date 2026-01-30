"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const useRouterHook = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        useRouterHook.push("/admin/dashboard");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4 font-sans">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[#D1510A]/10 rounded-2xl flex items-center justify-center mb-6 rotate-3">
            <Lock className="h-8 w-8 text-[#D1510A]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Portal</h2>
          <p className="mt-3 text-sm text-gray-500">
            Welcome back. Please sign in to manage your blog.
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#D1510A] transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#D1510A] focus:ring-4 focus:ring-[#D1510A]/10 text-sm outline-none transition-all duration-200"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#D1510A] transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#D1510A] focus:ring-4 focus:ring-[#D1510A]/10 text-sm outline-none transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-[#D1510A] hover:bg-[#B14108] focus:outline-none focus:ring-4 focus:ring-[#D1510A]/20 disabled:opacity-50 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#D1510A]/20"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
