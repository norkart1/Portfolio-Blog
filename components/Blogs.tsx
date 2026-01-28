'use client';

import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post._id} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-gray-600 line-clamp-3">{post.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center">No blog posts found yet.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
