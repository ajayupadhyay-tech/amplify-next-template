'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    packageName: '',
    duration: '',
    price: '',
    images: '',
    description: '',
    destinationId: ''
  });

  const fetchData = async () => {
    setLoading(true);
    const [pRes, dRes] = await Promise.all([
      fetch('/api/admin/packages'),
      fetch('/api/admin/destinations')
    ]);
    const pJson = await pRes.json();
    const dJson = await dRes.json();
    if (pJson.success) setPackages(pJson.data);
    if (dJson.success) setDestinations(dJson.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...form })
    });
    const json = await res.json();
    if (json.success) {
      setIsModalOpen(false);
      setEditingId(null);
      setForm({ packageName: '', duration: '', price: '', images: '', description: '', destinationId: '' });
      fetchData();
    } else {
      alert('Error: ' + json.error);
    }
  };

  const handleEdit = (pkg: any) => {
    setEditingId(pkg.id);
    setForm({
      packageName: pkg.packageName,
      duration: pkg.duration,
      price: pkg.price.toString(),
      images: pkg.images || '',
      description: pkg.description,
      destinationId: pkg.destinationId
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;
    const res = await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchData();
    } else {
      alert('Error deleting: ' + json.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Packages Management</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Manage tour offers, duration, price structures, and descriptions.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setForm({ packageName: '', duration: '', price: '', images: '', description: '', destinationId: destinations[0]?.id || '' });
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Package
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading packages...</div>
      ) : (
        <div className="bg-navy-light rounded-3xl border border-white/10 overflow-hidden shadow-md">
          <table className="w-full text-sm text-gray-300 text-left border-collapse">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Package Name</th>
                <th className="px-6 py-4">State Destination</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img src={pkg.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=80&q=80'} className="h-10 w-12 object-cover rounded-lg" />
                    <span>{pkg.packageName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-white/5 border border-white/10 text-gray-300 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {pkg.destination?.title}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">{pkg.duration}</td>
                  <td className="px-6 py-4 text-primary font-black text-xs">₹{pkg.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEdit(pkg)} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(pkg.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {packages.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-bold">No packages configured.</div>
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
              {editingId ? 'Edit Package' : 'Create Package'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
              <div className="flex flex-col gap-1.5">
                <label>PACKAGE NAME</label>
                <input 
                  type="text" 
                  required 
                  value={form.packageName} 
                  onChange={(e) => setForm({...form, packageName: e.target.value})} 
                  placeholder="e.g. Royal Rajasthan Heritage Cruise"
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>TOUR DURATION</label>
                  <input 
                    type="text" 
                    required 
                    value={form.duration} 
                    onChange={(e) => setForm({...form, duration: e.target.value})} 
                    placeholder="e.g. 7 Days 6 Nights"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>PRICE (INR)</label>
                  <input 
                    type="number" 
                    required 
                    value={form.price} 
                    onChange={(e) => setForm({...form, price: e.target.value})} 
                    placeholder="e.g. 45000"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>LINK DESTINATION STATE</label>
                  <select 
                    value={form.destinationId} 
                    onChange={(e) => setForm({...form, destinationId: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary cursor-pointer font-medium"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>IMAGE URL</label>
                  <input 
                    type="text" 
                    value={form.images} 
                    onChange={(e) => setForm({...form, images: e.target.value})} 
                    placeholder="https://images.unsplash.com/..."
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label>PACKAGE DESCRIPTION</label>
                <textarea 
                  rows={4}
                  required 
                  value={form.description} 
                  onChange={(e) => setForm({...form, description: e.target.value})} 
                  placeholder="Detailed tour highlights and itinerary itinerary..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium resize-none"
                />
              </div>

              <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all uppercase tracking-wide mt-2">
                Save Package
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
