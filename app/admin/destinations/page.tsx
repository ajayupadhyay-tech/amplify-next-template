'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    state: '',
    region: 'North',
    images: ''
  });

  const fetchDestinations = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/destinations');
    const json = await res.json();
    if (json.success) {
      setDestinations(json.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/destinations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...form })
    });
    const json = await res.json();
    if (json.success) {
      setIsModalOpen(false);
      setEditingId(null);
      setForm({ title: '', description: '', state: '', region: 'North', images: '' });
      fetchDestinations();
    } else {
      alert('Error: ' + json.error);
    }
  };

  const handleEdit = (dest: any) => {
    setEditingId(dest.id);
    setForm({
      title: dest.title,
      description: dest.description,
      state: dest.state,
      region: dest.region,
      images: dest.images || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    const res = await fetch(`/api/admin/destinations?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchDestinations();
    } else {
      alert('Error deleting: ' + json.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Destination Management</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Manage tourist states and zone assignments.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setForm({ title: '', description: '', state: '', region: 'North', images: '' });
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add State
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading destinations...</div>
      ) : (
        <div className="bg-navy-light rounded-3xl border border-white/10 overflow-hidden shadow-md">
          <table className="w-full text-sm text-gray-300 text-left border-collapse">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">State Title</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">State Ref</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {destinations.map((dest) => (
                <tr key={dest.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img src={dest.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=80&q=80'} className="h-10 w-12 object-cover rounded-lg" />
                    <span>{dest.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {dest.region}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{dest.state}</td>
                  <td className="px-6 py-4 max-w-[240px] truncate text-xs">{dest.description}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEdit(dest)} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(dest.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {destinations.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-bold">No destinations configured.</div>
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
              {editingId ? 'Edit Destination' : 'Create Destination'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
              <div className="flex flex-col gap-1.5">
                <label>STATE TITLE</label>
                <input 
                  type="text" 
                  required 
                  value={form.title} 
                  onChange={(e) => setForm({...form, title: e.target.value})} 
                  placeholder="e.g. Rajasthan"
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>STATE CODE/REF</label>
                  <input 
                    type="text" 
                    required 
                    value={form.state} 
                    onChange={(e) => setForm({...form, state: e.target.value})} 
                    placeholder="e.g. Rajasthan"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>GEOGRAPHIC ZONE</label>
                  <select 
                    value={form.region} 
                    onChange={(e) => setForm({...form, region: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary cursor-pointer"
                  >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                    <option value="North East">North East</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label>COVER IMAGE URL</label>
                <input 
                  type="text" 
                  value={form.images} 
                  onChange={(e) => setForm({...form, images: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>STATE DESCRIPTION</label>
                <textarea 
                  rows={4}
                  required 
                  value={form.description} 
                  onChange={(e) => setForm({...form, description: e.target.value})} 
                  placeholder="State description and tourism highlights..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium resize-none"
                />
              </div>

              <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all uppercase tracking-wide mt-2">
                Save Destination
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
