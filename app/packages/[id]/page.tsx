import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Clock, MapPin, Sparkles, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PackageDetailPage({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const pkg = await prisma.package.findUnique({
    where: { id },
    include: { destination: true }
  });

  if (!pkg) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-5xl mx-auto px-4 w-full">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 font-bold mb-6 flex gap-2">
          <Link href="/" className="hover:text-white">Home</Link> /
          <Link href="/packages" className="hover:text-white">Packages</Link> /
          <span className="text-primary">{pkg.packageName}</span>
        </div>

        {/* Hero image header */}
        <div className="relative h-[450px] w-full rounded-3xl overflow-hidden border border-white/10 mb-12 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent z-10" />
          <img 
            src={pkg.images || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80'} 
            alt={pkg.packageName} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid split content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-primary/10 border border-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-max">
                <Clock className="h-3.5 w-3.5" /> {pkg.duration}
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-max">
                <MapPin className="h-3.5 w-3.5 text-primary" /> {pkg.destination.title}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {pkg.packageName}
            </h1>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-4 text-gray-300 text-sm font-medium leading-relaxed">
              <h3 className="text-xl font-bold text-white">Journey Overview</h3>
              <p>{pkg.description}</p>
              
              <div className="bg-navy-light p-6 rounded-2xl border border-white/5 mt-4 grid grid-cols-2 gap-4">
                <div className="flex gap-2.5 items-start">
                  <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wide">Included Stay</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">5-Star Heritage Homestays</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wide">Tour Safety</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">Licensed Professional Guides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking / Checkout widget */}
          <div className="bg-navy-light p-8 rounded-3xl border border-white/10 h-max flex flex-col gap-6 shadow-md text-left">
            <div>
              <span className="text-[9px] uppercase font-bold text-gray-400 block tracking-wider">Book Direct Offer</span>
              <span className="text-primary text-3xl font-black">₹{pkg.price.toLocaleString()}</span>
              <span className="text-gray-400 text-xs font-semibold block mt-0.5">inclusive of stays & taxes</span>
            </div>

            <div className="border-t border-white/5 pt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Select Dates</label>
                <input type="date" className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Total Travelers</label>
                <select className="bg-navy border border-white/10 px-4 py-2.5 rounded-xl outline-none text-xs text-white cursor-pointer">
                  <option>2 Persons</option>
                  <option>1 Person</option>
                  <option>4 Persons</option>
                </select>
              </div>

              <button 
                onClick={() => alert('Booking enquiries logged. An Incredible India travel specialist will contact you by email within 12 hours.')}
                className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl text-xs transition-all text-center mt-4"
              >
                Send Booking Enquiry
              </button>

              <div className="text-[10px] text-gray-400 font-semibold text-center mt-2 flex items-center justify-center gap-1">
                <Heart className="h-3 w-3 text-red-500 fill-red-500" /> Free cancellation up to 72h prior.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
