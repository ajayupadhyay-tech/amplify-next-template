'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import SectionHeader from './SectionHeader';

const GLIMPSES = [
  {
    id: 1,
    title: 'Ganga Aarti at Varanasi',
    description: 'A spiritual symphony of fire, chants, and devotion on the ghats.',
    image: 'https://picsum.photos/seed/varanasi/800/1000',
    duration: '0:45 min',
  },
  {
    id: 2,
    title: 'Backwaters Houseboat Ride',
    description: 'Serene glides through green backwater labyrinths in Kerala.',
    image: 'https://picsum.photos/seed/keralavideo/800/1000',
    duration: '1:20 min',
  },
  {
    id: 3,
    title: 'Thar Desert Safari',
    description: 'Camping under a starry canopy amidst golden dunes of Jaisalmer.',
    image: 'https://picsum.photos/seed/desert/800/1000',
    duration: '0:50 min',
  },
  {
    id: 4,
    title: 'Himalayan Trekking',
    description: 'Conquering the snow trails and majestic paths of Ladakh.',
    image: 'https://picsum.photos/seed/himalayas/800/1000',
    duration: '1:10 min',
  },
];

export default function CinematicGlimpses() {
  return (
    <section className="py-24 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="TRAVEL STORIES IN MOTION"
          title={<>Cinematic <span className="italic-orange">Glimpses</span></>}
          subtitle="Watch brief snippets of incredible journeys lived by travelers across the Indian subcontinent."
          className="text-white"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GLIMPSES.map((glimpse, idx) => (
            <motion.div
              key={glimpse.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/5"
            >
              {/* Card Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url('${glimpse.image}')` }}
              />
              {/* Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent group-hover:via-navy/50 transition-all duration-300" />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.15 }}
                  className="bg-primary/90 text-white p-4 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                >
                  <Play className="h-6 w-6 fill-white" />
                </motion.div>
              </div>

              {/* Text Information */}
              <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-left">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2 bg-primary/10 border border-primary/20 px-2 py-0.5 rounded w-max">
                  {glimpse.duration}
                </span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {glimpse.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-out">
                  {glimpse.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
