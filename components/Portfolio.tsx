'use client';

import React from 'react';

const Portfolio = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-xl text-gray-600">Welcome to my personal space where I showcase my work and journey.</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Project One</h3>
          <p className="text-gray-600">Short description of your amazing project and the impact it made.</p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-2">Project Two</h3>
          <p className="text-gray-600">Short description of your amazing project and the impact it made.</p>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
