'use client';

import React from 'react';
import { Calendar, Tag, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';

interface PackageCardProps {
  id: string;
  name: string;
  price: number;
  duration: string;
  category: string;
  image: string;
  featured?: boolean;
  highlights: string[];
}

export default function PackageCard({
  id,
  name,
  price,
  duration,
  category,
  image,
  featured,
  highlights,
}: PackageCardProps) {
  // Format price to INR locale format
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col h-full text-left relative">
      {featured && (
        <span className="absolute top-4 left-4 z-10 px-3.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
          Best Seller
        </span>
      )}
      
      {/* Thumbnail */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100 shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Details Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs text-gray-500 font-semibold mb-3">
          <span className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-full text-navy">
            <Calendar className="h-3 w-3 text-primary" />
            {duration}
          </span>
          <span className="flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 rounded-full text-primary">
            <Tag className="h-3 w-3" />
            {category}
          </span>
        </div>

        <h3 className="text-xl font-bold text-navy mb-4 group-hover:text-primary transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Highlights */}
        {highlights && highlights.length > 0 && (
          <ul className="space-y-2 mb-6 text-sm text-gray-600 flex-grow" style={{ border: 'none', background: 'none', padding: 0 }}>
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2" style={{ padding: 0, background: 'none' }}>
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer Area */}
        <div className="pt-5 border-t border-gray-100 flex items-center justify-between mt-auto">
          <div>
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider">Starting from</span>
            <span className="text-xl font-black text-navy">{formattedPrice}</span>
          </div>
          <Link 
            href={`#enquiry`}
            className="flex items-center justify-center gap-1.5 bg-navy hover:bg-primary text-white font-bold px-4 py-2.5 rounded-xl transition-all duration-200"
          >
            <span>Enquire</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
