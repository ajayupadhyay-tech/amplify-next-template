'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Compass } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-navy">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 transform scale-105"
        style={{ backgroundImage: `url('https://picsum.photos/seed/tajmahal/1920/1080')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs md:text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
            <Compass className="h-4 w-4 animate-spin-slow" />
            Discover The Soul of India
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Unveil the Magic of <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-primary via-orange-400 to-yellow-300 bg-clip-text text-transparent italic">
              Incredible India
            </span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-gray-300 mb-10 font-medium">
            From majestic forts in Rajasthan to serene backwaters in Kerala, embark on a journey that will stay in your heart forever.
          </p>
        </motion.div>

        {/* Search Bar Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-4 rounded-2xl md:rounded-full border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-4 text-left"
        >
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] text-gray-300 font-bold uppercase tracking-wider">Destination</label>
              <input 
                type="text" 
                placeholder="Where to go?" 
                className="w-full bg-transparent border-none text-white placeholder-gray-400 focus:outline-none text-sm font-semibold"
              />
            </div>
          </div>

          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
            <Calendar className="h-5 w-5 text-primary shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] text-gray-300 font-bold uppercase tracking-wider">Duration</label>
              <select className="w-full bg-transparent border-none text-white focus:outline-none text-sm font-semibold cursor-pointer">
                <option className="text-navy" value="">Any duration</option>
                <option className="text-navy" value="3-5">3 - 5 Days</option>
                <option className="text-navy" value="6-9">6 - 9 Days</option>
                <option className="text-navy" value="10+">10+ Days</option>
              </select>
            </div>
          </div>

          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
            <Compass className="h-5 w-5 text-primary shrink-0" />
            <div className="w-full">
              <label className="block text-[10px] text-gray-300 font-bold uppercase tracking-wider">Category</label>
              <select className="w-full bg-transparent border-none text-white focus:outline-none text-sm font-semibold cursor-pointer">
                <option className="text-navy" value="">All themes</option>
                <option className="text-navy" value="culture">Culture</option>
                <option className="text-navy" value="nature">Nature</option>
                <option className="text-navy" value="adventure">Adventure</option>
              </select>
            </div>
          </div>

          <button className="w-full md:w-auto bg-primary hover:bg-orange-600 text-white font-bold p-4 md:p-5 rounded-xl md:rounded-full flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-105 duration-200">
            <Search className="h-5 w-5" />
            <span className="md:hidden">Search Tours</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
