'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Solo Explorer, UK',
    content: 'My trip to Rajasthan was absolutely magical. The heritage hotel stays, local guided tours, and rich cultural details were managed flawlessly. Highly recommended!',
    rating: 5,
    avatar: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: 2,
    name: 'Carlos Mendez',
    role: 'Adventure Enthusiast, Spain',
    content: 'Trekking in Ladakh was challenging but the support team made it super comfortable. Every meal, camp, and logistics detail was perfect. Can\'t wait for the next trip!',
    rating: 5,
    avatar: 'https://picsum.photos/seed/user2/100/100',
  },
  {
    id: 3,
    name: 'Aiko Tanaka',
    role: 'Culture Researcher, Japan',
    content: 'Varanasi left a lasting impression on my soul. The morning boat ride and aarti ceremonies were structured so well by our guides. A deeply spiritual journey.',
    rating: 5,
    avatar: 'https://picsum.photos/seed/user3/100/100',
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  const next = () => setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));

  return (
    <section className="py-24 bg-navy text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url('https://picsum.photos/seed/map/1920/1080')` }}
      />

      <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
        <Quote className="h-16 w-16 text-primary/30 mx-auto mb-8 animate-pulse" />

        <div className="min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-8 max-w-3xl italic">
                "{TESTIMONIALS[index].content}"
              </p>
              
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS[index].avatar} 
                  alt={TESTIMONIALS[index].name}
                  className="h-14 w-14 rounded-full border-2 border-primary object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-lg text-primary">{TESTIMONIALS[index].name}</h4>
                  <p className="text-sm text-gray-400 font-semibold">{TESTIMONIALS[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-6 mt-12">
          <button 
            onClick={prev}
            className="p-3 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={next}
            className="p-3 rounded-full border border-white/10 hover:border-primary hover:text-primary transition-all duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
