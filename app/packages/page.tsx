import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Clock, Tag, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function PackagesPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams;
  const search = params.search || '';
  const destinationId = params.destinationId || '';

  const whereClause: any = {};
  if (destinationId) {
    whereClause.destinationId = destinationId;
  }
  if (search) {
    whereClause.OR = [
      { packageName: { contains: search } },
      { description: { contains: search } }
    ];
  }

  const pkgs = await prisma.package.findMany({
    where: whereClause,
    include: { destination: true },
    orderBy: { createdAt: 'desc' }
  });

  const destinations = await prisma.destination.findMany({
    orderBy: { title: 'asc' }
  });

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">EXPLORE VACATIONS</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white mt-1">Handcrafted Tour Packages</h1>
          </div>
          
          <form method="GET" action="/packages" className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              name="search" 
              defaultValue={search}
              placeholder="Search package name..."
              className="bg-navy-light border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white outline-none focus:border-primary w-full sm:w-[240px]" 
            />
            <select 
              name="destinationId"
              defaultValue={destinationId}
              className="bg-navy-light border border-white/10 px-4 py-2.5 rounded-xl text-xs text-white outline-none focus:border-primary cursor-pointer"
            >
              <option value="">All Destinations</option>
              {destinations.map(d => (
                <option key={d.id} value={d.id}>{d.title}</option>
              ))}
            </select>
            <button type="submit" className="bg-primary hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all">
              Filter
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pkgs.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-navy-light rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between h-[480px] shadow-sm hover:border-primary/20 transition-all"
            >
              <div className="h-[220px] relative">
                <img 
                  src={pkg.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80'} 
                  alt={pkg.packageName} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-xs font-bold text-primary flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {pkg.duration}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="h-3 w-3 text-primary" /> {pkg.destination.title} ({pkg.destination.region} India)
                  </span>
                  <h3 className="text-xl font-bold text-white leading-snug line-clamp-2">
                    {pkg.packageName}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mt-1">
                    {pkg.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <div>
                    <span className="text-gray-400 text-[9px] uppercase font-bold block">Start Price</span>
                    <span className="text-primary text-xl font-black">₹{pkg.price.toLocaleString()}</span>
                  </div>
                  
                  <Link 
                    href={`/packages/${pkg.id}`}
                    className="bg-white/5 border border-white/10 hover:bg-primary hover:border-primary text-white font-bold px-6 py-2 rounded-xl text-xs transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {pkgs.length === 0 && (
            <div className="col-span-3 text-center py-20 bg-navy-light rounded-3xl border border-white/5 text-gray-400 font-semibold">
              No tour packages found. Try resetting search parameters.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
