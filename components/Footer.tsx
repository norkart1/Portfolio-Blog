'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, PlusCircle, List, User } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: LayoutGrid, path: '/categories', label: 'Categories' },
    { icon: PlusCircle, path: '/post/create', label: 'Create', isCenter: true },
    { icon: List, path: '/post/my-posts', label: 'My Posts' },
    { icon: User, path: '/admin', label: 'Profile' },
  ];

  return (
    <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl shadow-2xl p-2 z-50">
      <nav className="flex items-center justify-between px-2 py-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          if (item.isCenter) {
            return (
              <Link
                key={index}
                href={item.path}
                className="flex items-center justify-center -mt-8"
              >
                <div className="bg-[#D1510A] p-4 rounded-full shadow-lg shadow-[#D1510A]/30 transition-transform hover:scale-110 active:scale-95">
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'text-[#D1510A]' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-[#D1510A]/10' : ''}`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default Footer;
