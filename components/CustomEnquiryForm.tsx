'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import SectionHeader from './SectionHeader';

export default function CustomEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    guests: '2',
    budget: 'Medium',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill out the required fields.');
      return;
    }
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="enquiry" className="py-24 bg-off-white scroll-mt-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center gap-6">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
            <h2 className="text-3xl font-black text-navy">Enquiry Submitted!</h2>
            <p className="text-gray-500 font-medium leading-relaxed max-w-md">
              Thank you for reaching out, <span className="text-primary font-bold">{formData.name}</span>. One of our travel curators will contact you on <span className="text-navy font-bold">{formData.phone}</span> within 24 hours to present your custom itinerary.
            </p>
            <button 
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  destination: '',
                  guests: '2',
                  budget: 'Medium',
                  message: '',
                });
              }}
              className="mt-4 bg-navy hover:bg-primary text-white font-bold px-8 py-3 rounded-full transition-all duration-200"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="enquiry" className="py-24 bg-off-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader
          eyebrow="TAILOR-MADE JOURNEYS"
          title={<>Can't find the perfect package? <br className="hidden sm:inline" />We'll <span className="italic-orange">build it</span> for you!</>}
          subtitle="Tell us your preferences and our destination specialists will curate a personalized tour plan matching your budget."
        />

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col gap-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Name *</label>
              <input 
                type="text" 
                placeholder="Ajay Upadhyay"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Email *</label>
              <input 
                type="email" 
                placeholder="ajay@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Phone *</label>
              <input 
                type="tel" 
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Expected Destination</label>
              <input 
                type="text" 
                placeholder="e.g. Kashmir, Kerala, Goa"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Number of Guests</label>
              <select 
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              >
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers (Couple)</option>
                <option value="3-5">3 - 5 Travelers (Family)</option>
                <option value="6+">6+ Travelers (Group)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy">Estimated Budget</label>
              <select 
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium"
              >
                <option value="Budget">Budget Friendly</option>
                <option value="Medium">Standard / Comfort</option>
                <option value="Premium">Luxury / Premium</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-navy">Tell us what you want to experience</label>
            <textarea 
              rows={4}
              placeholder="Describe your dreams (e.g. want to do stargazing in dunes, houseboat with candle light dinner, river rafting...)"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-navy font-medium resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 duration-200"
          >
            <Send className="h-5 w-5" />
            <span>Submit Custom Enquiry</span>
          </button>
        </form>
      </div>
    </section>
  );
}
