'use client';

import React from 'react';
import { ShieldCheck, Headphones, HeartHandshake, MapPin } from 'lucide-react';
import SectionHeader from './SectionHeader';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Verified & Secure Bookings',
    description: 'We guarantee full payment protection and partner only with certified, highly rated local operators.',
  },
  {
    icon: Headphones,
    title: '24/7 Ground Support',
    description: 'Our dedicated travel specialists are available around the clock to support you during your entire trip.',
  },
  {
    icon: HeartHandshake,
    title: 'Handcrafted Itineraries',
    description: 'Every tour plan is customized by local destination experts to ensure deep, immersive experiences.',
  },
  {
    icon: MapPin,
    title: 'Local Expert Guides',
    description: 'Travel with storytellers, historians, and local guides who know their hometowns inside out.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="WHY CHOOSE US"
          title={<>Why Travel With <span className="italic-orange">Us</span>?</>}
          subtitle="We focus on creating seamless, deeply authentic, and memorable journeys."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={idx}
                className="bg-off-white p-8 rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-left"
              >
                <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-xl w-max mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
