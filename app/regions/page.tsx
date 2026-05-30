import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { MapPin, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

const ZONES = ['North', 'South', 'East', 'West', 'North East'];

export default async function RegionsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">GEOGRAPHIC ZONES</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-1">Explore India by Zones</h1>
          <p className="text-gray-400 mt-4 text-sm font-medium">India's culture and geography shift across its regions. Select a zone to view states and available packages.</p>
        </div>

        <div className="flex flex-col gap-16">
          {ZONES.map((zone) => {
            const zoneDestinations = destinations.filter(d => d.region === zone);
            
            return (
              <div key={zone} className="flex flex-col gap-6 text-left">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Compass className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{zone} India</h2>
                  <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-0.5 rounded-full text-xs font-bold">
                    {zoneDestinations.length} States
                  </span>
                </div>

                {zoneDestinations.length === 0 ? (
                  <p className="text-gray-500 text-xs italic font-medium">No states currently seeded in this region.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {zoneDestinations.map((dest) => (
                      <div 
                        key={dest.id}
                        className="group relative h-[300px] rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-end p-6 shadow-md"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent z-10" />
                        <img 
                          src={dest.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80'} 
                          alt={dest.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        
                        <div className="relative z-20 flex flex-col gap-2">
                          <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                            <MapPin className="h-4.5 w-4.5 text-primary" /> {dest.title}
                          </h3>
                          <p className="text-gray-300 text-[10px] leading-relaxed line-clamp-2 font-medium">
                            {dest.description}
                          </p>
                          <Link 
                            href={`/packages?destinationId=${dest.id}`}
                            className="mt-2 bg-primary hover:bg-orange-600 text-white text-center font-bold py-2 rounded-xl transition-all text-[10px]"
                          >
                            Explore Tour Packages
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
