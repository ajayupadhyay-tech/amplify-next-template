'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SectionHeader from '@/components/SectionHeader';
import { Compass, Users, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const TEAM = [
  { name: 'Amit Sharma', role: 'Founder & Chief Curator', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80' },
  { name: 'Priya Patel', role: 'Rajasthan & North Curator', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80' },
  { name: 'Rohan D\'Souza', role: 'Kerala & South Expert', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionHeader
          eyebrow="ABOUT OUR AGENCY"
          title={<>Crafting Immersive <span className="italic-orange">India Experiences</span></>}
          subtitle="We believe travel should be deeply personal, immersive, and respectful of local cultures."
        />

        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 text-left mt-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/10"
          >
            <img 
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" 
              alt="Travelers in India"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-3xl font-black text-white leading-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" /> Our Philosophy
            </h3>
            <p className="text-gray-300 font-medium leading-relaxed text-sm">
              Founded in 2010, Incredible India Travel Agency was born out of a desire to show the world the true soul of India. We go beyond the standard tourist tracks, taking you into the heart of local communities, majestic forts, and serene sanctuaries.
            </p>
            <p className="text-gray-300 font-medium leading-relaxed text-sm">
              Our local travel curators craft custom itineraries that blend comfort with authentic exploration, ensuring your journey is tailored exactly to your dreams.
            </p>
          </motion.div>
        </div>

        {/* Stats / Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 text-left">
          {[
            { icon: Compass, title: '15+ Years', desc: 'Crafting unique travel memories' },
            { icon: Users, title: '25,000+ Guests', desc: 'Trusted by travelers worldwide' },
            { icon: Award, title: 'National Awards', desc: 'Recognized for heritage tourism' },
            { icon: ShieldCheck, title: '100% Certified', desc: 'Fully licensed and secure' },
          ].map((value, idx) => {
            const Icon = value.icon;
            return (
              <div key={idx} className="bg-navy-light p-8 rounded-3xl border border-white/5 shadow-sm flex flex-col gap-4">
                <div className="bg-primary/10 border border-primary/20 text-primary p-3.5 rounded-xl w-max">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-white">{value.title}</h4>
                <p className="text-xs text-gray-400 font-semibold leading-relaxed">{value.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-12">Meet Our Specialists</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-navy-light p-6 rounded-3xl border border-white/5 shadow-sm text-center flex flex-col items-center"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover mb-4 border-2 border-primary"
                />
                <h4 className="font-bold text-white text-lg">{member.name}</h4>
                <p className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
