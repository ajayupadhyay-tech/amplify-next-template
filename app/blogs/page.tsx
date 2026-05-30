import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Clock, User, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <section className="py-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">TRAVEL DIARIES</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-1">Indian Travel Diaries</h1>
          <p className="text-gray-400 mt-4 text-sm font-medium">Stories, advice, and highlights from real travelers who traversed the states of India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className="bg-navy-light rounded-3xl overflow-hidden border border-white/5 flex flex-col justify-between h-[480px] hover:border-primary/20 transition-all shadow-sm"
            >
              <div className="h-[220px] relative">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/10 text-xs font-bold text-primary">
                  {blog.category}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> {blog.readTime} read • By {blog.author}
                  </span>
                  <h3 className="text-lg font-bold text-white line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-3 leading-relaxed mt-1">
                    {blog.content}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <span className="text-[9px] uppercase font-bold text-gray-500">{blog.state}</span>
                  <Link 
                    href={`/blogs/${blog.id}`}
                    className="text-primary text-xs font-bold hover:underline flex items-center gap-1"
                  >
                    Read Story <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
