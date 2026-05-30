import React from 'react';
import { prisma } from '@/lib/prisma';
import { Map, Compass, Calendar, FileText, Database, Shield } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const destCount = await prisma.destination.count();
  const pkgCount = await prisma.package.count();
  const evtCount = await prisma.event.count();
  const blogCount = await prisma.blog.count();

  const stats = [
    { label: 'Total Destinations', value: destCount, icon: Map, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Total Packages', value: pkgCount, icon: Compass, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Total Events', value: evtCount, icon: Calendar, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Total Blogs & Stories', value: blogCount, icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Banner */}
      <div className="bg-navy-light/60 border border-white/10 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Console Overview</h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">Configure and manage seeded records for the Incredible India portal.</p>
        </div>
        <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold w-max">
          <Database className="h-4.5 w-4.5" />
          <span>Database: SQLite Online</span>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="bg-navy-light p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <span className="text-gray-400 text-xs font-bold">{stat.label}</span>
                <span className="text-3xl font-black text-white">{stat.value}</span>
              </div>
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl border border-white/5`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Database Management Guide */}
      <div className="bg-navy-light p-8 rounded-3xl border border-white/5 text-left flex flex-col gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Management Controls
        </h2>
        <p className="text-gray-300 text-xs font-medium leading-relaxed">
          Use the left-hand sidebar navigation links to add, edit, or delete items. 
          All updates are stored dynamically inside the SQLite client and will immediately sync onto the public travel site homepage and filters.
        </p>

        <div className="mt-4 border-t border-white/5 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-400 font-bold">
          <div>
            <h4 className="text-white mb-1.5 uppercase tracking-wide">Prisma Schema</h4>
            <span className="bg-white/5 px-2.5 py-1 rounded-md">prisma/schema.prisma</span>
          </div>
          <div>
            <h4 className="text-white mb-1.5 uppercase tracking-wide">NextAuth Roles</h4>
            <span className="bg-white/5 px-2.5 py-1 rounded-md">ADMIN / EDITOR</span>
          </div>
          <div>
            <h4 className="text-white mb-1.5 uppercase tracking-wide">Asset Library</h4>
            <span className="bg-white/5 px-2.5 py-1 rounded-md">public/assets/</span>
          </div>
        </div>
      </div>
    </div>
  );
}
