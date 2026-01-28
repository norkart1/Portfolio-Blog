'use client';

import React from 'react';

const Portfolio = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-gray-600">Welcome to my personal space. I will be sharing my work and projects here soon.</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-12 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <p className="text-gray-400 font-medium italic">New projects coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
