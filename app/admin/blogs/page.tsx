'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
    state: '',
    category: 'Heritage',
    image: '',
    readTime: '5 mins',
    author: ''
  });

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/blogs');
    const json = await res.json();
    if (json.success) setBlogs(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...form })
    });
    const json = await res.json();
    if (json.success) {
      setIsModalOpen(false);
      setEditingId(null);
      setForm({ title: '', content: '', state: '', category: 'Heritage', image: '', readTime: '5 mins', author: '' });
      fetchBlogs();
    } else {
      alert('Error: ' + json.error);
    }
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
      state: blog.state,
      category: blog.category,
      image: blog.image || '',
      readTime: blog.readTime,
      author: blog.author
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchBlogs();
    } else {
      alert('Error deleting: ' + json.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Diaries & Blogs</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Manage travel story cards, author tags, and read duration.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setForm({ title: '', content: '', state: '', category: 'Heritage', image: '', readTime: '5 mins', author: '' });
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Story
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading blogs...</div>
      ) : (
        <div className="bg-navy-light rounded-3xl border border-white/10 overflow-hidden shadow-md">
          <table className="w-full text-sm text-gray-300 text-left border-collapse">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Article Title</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">State</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img src={blog.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=80&q=80'} className="h-10 w-12 object-cover rounded-lg" />
                    <span>{blog.title}</span>
                  </td>
                  <td className="px-6 py-4">{blog.author}</td>
                  <td className="px-6 py-4 text-primary font-bold text-xs">{blog.category}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{blog.state}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEdit(blog)} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {blogs.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-bold">No travel diaries configured.</div>
          )}
        </div>
      )}

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-navy/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-navy-light w-full max-w-lg border border-white/10 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded-lg">
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Story' : 'Create Story'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
              <div className="flex flex-col gap-1.5">
                <label>ARTICLE TITLE</label>
                <input 
                  type="text" 
                  required 
                  value={form.title} 
                  onChange={(e) => setForm({...form, title: e.target.value})} 
                  placeholder="e.g. Chasing Sunsets in Jaisalmer"
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>AUTHOR NAME</label>
                  <input 
                    type="text" 
                    required 
                    value={form.author} 
                    onChange={(e) => setForm({...form, author: e.target.value})} 
                    placeholder="e.g. Aarav Malhotra"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>STATE TOPIC</label>
                  <input 
                    type="text" 
                    required 
                    value={form.state} 
                    onChange={(e) => setForm({...form, state: e.target.value})} 
                    placeholder="e.g. Rajasthan"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>EXPERIENCE CATEGORY</label>
                  <select 
                    value={form.category} 
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary cursor-pointer font-medium"
                  >
                    <option value="Heritage">Heritage</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Gastronomy">Gastronomy</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Nature">Nature</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>READ DURATION</label>
                  <input 
                    type="text" 
                    required 
                    value={form.readTime} 
                    onChange={(e) => setForm({...form, readTime: e.target.value})} 
                    placeholder="e.g. 5 mins"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label>ARTICLE COVER IMAGE URL</label>
                <input 
                  type="text" 
                  value={form.image} 
                  onChange={(e) => setForm({...form, image: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>CONTENT TEXT</label>
                <textarea 
                  rows={4}
                  required 
                  value={form.content} 
                  onChange={(e) => setForm({...form, content: e.target.value})} 
                  placeholder="Full travel article writeup..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium resize-none"
                />
              </div>

              <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all uppercase tracking-wide mt-2">
                Save Diary Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
