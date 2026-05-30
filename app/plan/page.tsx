'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plane, Hotel, Train, Bus, Car, Sparkles, Send, CheckCircle2 } from 'lucide-react';

export default function PlanTripPage() {
  const [activeTab, setActiveTab] = useState('flights');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    passengers: '2 Adults',
    serviceType: 'Economy'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-4xl mx-auto px-4 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4" /> HANDCRAFT YOUR RIDE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">Plan Your Custom Trip</h1>
          <p className="text-gray-400 mt-3 text-xs font-semibold">Compare flights, trains, hotels, and select local travel partners directly.</p>
        </div>

        {submitted ? (
          <div className="bg-navy-light rounded-3xl p-12 border border-primary/20 text-center flex flex-col items-center gap-6 shadow-md max-w-xl mx-auto">
            <CheckCircle2 className="h-16 w-16 text-primary animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Trip Inquiry Received!</h2>
            <p className="text-gray-400 text-xs font-medium leading-relaxed">
              We have successfully logged your booking request for a custom ride to <strong className="text-white">{formData.to || 'India'}</strong>. 
              Our curators will compare fares and contact you at <strong className="text-white">{formData.email}</strong> within 12 hours.
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all mt-4"
            >
              Plan Another Trip
            </button>
          </div>
        ) : (
          <div className="bg-navy-light rounded-3xl p-8 sm:p-12 border border-white/10 shadow-lg flex flex-col gap-8">
            {/* Tabs Selector */}
            <div className="flex flex-wrap gap-2 border-b border-white/15 pb-6 justify-center">
              {[
                { id: 'flights', label: 'Flights', icon: Plane },
                { id: 'hotels', label: 'Hotels', icon: Hotel },
                { id: 'trains', label: 'Trains', icon: Train },
                { id: 'buses', label: 'Buses', icon: Bus },
                { id: 'cabs', label: 'Private Cabs', icon: Car },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-white scale-105 shadow-sm'
                        : 'bg-navy border border-white/10 text-gray-300 hover:border-primary/40'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form inputs */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
              {/* Trip details grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Departure Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Delhi (DEL)" 
                    required
                    value={formData.from}
                    onChange={(e) => setFormData({...formData, from: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Destination Spot</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jaipur, Rajasthan" 
                    required
                    value={formData.to}
                    onChange={(e) => setFormData({...formData, to: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Travel Date</label>
                  <input 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Travelers & Rooms</label>
                  <select 
                    value={formData.passengers}
                    onChange={(e) => setFormData({...formData, passengers: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white cursor-pointer focus:border-primary"
                  >
                    <option>2 Adults, 1 Room</option>
                    <option>1 Adult, 1 Room</option>
                    <option>4 Adults, 2 Rooms</option>
                  </select>
                </div>
              </div>

              {/* Personal details grid */}
              <div className="border-t border-white/10 pt-6 mt-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="name@domain.com" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-400 uppercase font-bold">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white focus:border-primary" 
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center mt-4 flex items-center justify-center gap-1.5"
              >
                <Send className="h-4 w-4" />
                <span>Submit Custom Booking Request</span>
              </button>
            </form>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
