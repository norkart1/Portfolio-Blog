'use client';

import React from 'react';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

const Socials = () => {
  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Social Media</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#D1510A]/10 transition-colors">
                <Icon className="w-8 h-8 text-gray-600 group-hover:text-[#D1510A]" />
              </div>
              <span className="mt-4 font-medium text-gray-900">{social.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Socials;
