'use client';

import React from 'react';
import { MapPin, Compass } from 'lucide-react';
import Link from 'next/link';

interface DestinationCardProps {
  id: string;
  name: string;
  region: string;
  image: string;
  description?: string;
  packageCount?: number;
}

export default function DestinationCard({
  id,
  name,
  region,
  image,
  description,
  packageCount = 0,
}: DestinationCardProps) {
  return (
    <div className="group relative h-[360px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 cursor-pointer">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-out"
        style={{ backgroundImage: `url('${image}')` }}
      />
      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent group-hover:via-navy/60 transition-all duration-300" />

      {/* Package Count Badge */}
      <div className="absolute top-4 right-4 z-10 bg-white/95 text-navy font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 backdrop-blur-sm">
        <Compass className="h-3.5 w-3.5 text-primary animate-spin-slow" />
        <span>{packageCount} Packages</span>
      </div>

      {/* Card Content */}
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end text-left text-white">
        <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {region}
        </span>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
