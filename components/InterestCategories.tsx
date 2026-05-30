'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Palmtree, Trees, Mountain, Sparkles, Heart } from 'lucide-react';
import SectionHeader from './SectionHeader';

const CATEGORIES = [
  { id: 'heritage', name: 'Heritage & Culture', count: 18, icon: Landmark, color: 'bg-orange-500/10 text-orange-600 border-orange-500/20' },
  { id: 'beaches', name: 'Beaches & Islands', count: 12, icon: Palmtree, color: 'bg-teal-500/10 text-teal-600 border-teal-500/20' },
  { id: 'wildlife', name: 'Wildlife & Safari', count: 10, icon: Trees, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
  { id: 'hillstations', name: 'Hills & Mountains', count: 15, icon: Mountain, color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
  { id: 'spiritual', name: 'Spiritual Tours', count: 8, icon: Sparkles, color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  { id: 'honeymoon', name: 'Romantic Gateways', count: 14, icon: Heart, color: 'bg-rose-500/10 text-rose-600 border-rose-500/20' },
];

export default function InterestCategories() {
  return (
    <section className="py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FIND TOURS BY INTEREST"
          title={<>Tours Crafted Around <span className="italic-orange">Interests</span></>}
          subtitle="Explore India through specialized travel experiences tailored to what you love most."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center cursor-pointer`}
              >
                <div className={`p-4 rounded-xl mb-4 border ${cat.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="font-bold text-navy text-sm sm:text-base leading-snug mb-1">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {cat.count} Tours
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
