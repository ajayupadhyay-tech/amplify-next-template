'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    month: 'January',
    state: '',
    category: 'Cultural',
    image: '',
    description: ''
  });

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/events');
    const json = await res.json();
    if (json.success) setEvents(json.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editingId, ...form })
    });
    const json = await res.json();
    if (json.success) {
      setIsModalOpen(false);
      setEditingId(null);
      setForm({ name: '', month: 'January', state: '', category: 'Cultural', image: '', description: '' });
      fetchEvents();
    } else {
      alert('Error: ' + json.error);
    }
  };

  const handleEdit = (evt: any) => {
    setEditingId(evt.id);
    setForm({
      name: evt.name,
      month: evt.month,
      state: evt.state,
      category: evt.category,
      image: evt.image || '',
      description: evt.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    const res = await fetch(`/api/admin/events?id=${id}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      fetchEvents();
    } else {
      alert('Error deleting: ' + json.error);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Events Management</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Manage local state festivals, month groupings, and categories.</p>
        </div>
        <button 
          onClick={() => {
            setEditingId(null);
            setForm({ name: '', month: 'January', state: '', category: 'Cultural', image: '', description: '' });
            setIsModalOpen(true);
          }}
          className="bg-primary hover:bg-orange-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 font-bold">Loading events...</div>
      ) : (
        <div className="bg-navy-light rounded-3xl border border-white/10 overflow-hidden shadow-md">
          <table className="w-full text-sm text-gray-300 text-left border-collapse">
            <thead className="bg-white/5 text-[10px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="px-6 py-4">Event Name</th>
                <th className="px-6 py-4">Month</th>
                <th className="px-6 py-4">State Location</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {events.map((evt) => (
                <tr key={evt.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                    <img src={evt.image || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=80&q=80'} className="h-10 w-12 object-cover rounded-lg" />
                    <span>{evt.name}</span>
                  </td>
                  <td className="px-6 py-4">{evt.month}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{evt.state}</td>
                  <td className="px-6 py-4">
                    <span className="bg-white/5 border border-white/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {evt.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleEdit(evt)} className="text-gray-400 hover:text-primary p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(evt.id)} className="text-gray-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/5 transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-bold">No events configured.</div>
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
              {editingId ? 'Edit Event' : 'Create Event'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-bold text-gray-300">
              <div className="flex flex-col gap-1.5">
                <label>EVENT/FESTIVAL NAME</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={(e) => setForm({...form, name: e.target.value})} 
                  placeholder="e.g. Diwali Festival"
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label>MONTH</label>
                  <select 
                    value={form.month} 
                    onChange={(e) => setForm({...form, month: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary cursor-pointer font-medium"
                  >
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>STATE LOCATION</label>
                  <input 
                    type="text" 
                    required 
                    value={form.state} 
                    onChange={(e) => setForm({...form, state: e.target.value})} 
                    placeholder="e.g. Goa"
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label>THEME CATEGORY</label>
                  <select 
                    value={form.category} 
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary cursor-pointer font-medium"
                  >
                    <option value="Cultural">Cultural</option>
                    <option value="Spiritual">Spiritual</option>
                    <option value="Music">Music</option>
                    <option value="Harvest">Harvest</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label>COVER IMAGE URL</label>
                <input 
                  type="text" 
                  value={form.image} 
                  onChange={(e) => setForm({...form, image: e.target.value})} 
                  placeholder="https://images.unsplash.com/..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label>EVENT DESCRIPTION</label>
                <textarea 
                  rows={4}
                  required 
                  value={form.description} 
                  onChange={(e) => setForm({...form, description: e.target.value})} 
                  placeholder="Event significance, activities and highlights..."
                  className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-white focus:border-primary font-medium resize-none"
                />
              </div>

              <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all uppercase tracking-wide mt-2">
                Save Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
