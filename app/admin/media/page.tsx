'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Link as LinkIcon, FileImage } from 'lucide-react';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    filename: '',
    url: '',
    size: '1.2 MB'
  });

  const fetchMedia = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/media');
    const json = await res.json();
    if (json.success) setMedia(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.filename || !form.url) return;

    const res = await fetch('/api/admin/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const json = await res.json();
    if (json.success) {
      setForm({ filename: '', url: '', size: '1.2 MB' });
      fetchMedia();
    } else {
      alert('Error uploading: ' + json.error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media asset?')) return;
    const res = await fetch(`/api/admin/media?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchMedia();
    } else {
      alert('Error deleting: ' + json.error);
    }
  };

  return (
    <div className="flex flex-col gap-8 text-left">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Media Library</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">Upload and preview digital media assets used in landing cards and itineraries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload form */}
        <div className="bg-navy-light p-6 rounded-3xl border border-white/10 h-max flex flex-col gap-4 text-left">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileImage className="h-5 w-5 text-primary" /> Simulate Image Upload
          </h3>
          <p className="text-gray-400 text-xs font-semibold leading-relaxed">
            Specify a public image web path to simulate CDN storage. This logs metadata in our SQLite tables for reuse.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-300 mt-2">
            <div className="flex flex-col gap-1.5">
              <label>ASSET FILENAME</label>
              <input 
                type="text" 
                required 
                value={form.filename} 
                onChange={(e) => setForm({...form, filename: e.target.value})} 
                placeholder="e.g. jaipur-sunset-view.jpg"
                className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>SOURCE URL</label>
              <input 
                type="text" 
                required 
                value={form.url} 
                onChange={(e) => setForm({...form, url: e.target.value})} 
                placeholder="https://images.unsplash.com/..."
                className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label>FILE SIZE ESTIMATION</label>
              <input 
                type="text" 
                required 
                value={form.size} 
                onChange={(e) => setForm({...form, size: e.target.value})} 
                placeholder="e.g. 1.5 MB"
                className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
              />
            </div>

            <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 uppercase tracking-wide mt-2">
              <Plus className="h-4 w-4" /> Link Asset
            </button>
          </form>
        </div>

        {/* Media grid list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-20 text-gray-400 font-bold">Loading media items...</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {media.map((item) => (
                <div 
                  key={item.id}
                  className="group relative h-[180px] rounded-2xl overflow-hidden border border-white/10 shadow-sm flex flex-col justify-end p-4"
                >
                  <img src={item.url} alt={item.filename} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-10">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-white/10 hover:bg-white/20 border border-white/20 p-2 rounded-xl text-white transition-all"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </a>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-white/10 hover:bg-red-500/20 border border-white/20 p-2 rounded-xl text-white hover:text-red-400 transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="relative z-20 flex flex-col pointer-events-none">
                    <span className="text-[10px] text-white font-bold truncate bg-black/60 px-2 py-0.5 rounded w-max max-w-full">
                      {item.filename}
                    </span>
                    <span className="text-[8px] text-gray-400 mt-0.5 font-bold">
                      {item.size}
                    </span>
                  </div>
                </div>
              ))}

              {media.length === 0 && (
                <div className="col-span-3 text-center py-20 bg-navy-light rounded-3xl border border-white/5 text-gray-500 font-bold w-full">
                  Media library is empty. Link some assets.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
