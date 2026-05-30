import React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { Clock, User, Calendar, Tag } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogDetailPage({ params }: { params: Promise<any> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const blog = await prisma.blog.findUnique({
    where: { id }
  });

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-navy flex flex-col justify-between text-left">
      <Navbar />

      <article className="py-20 flex-grow max-w-3xl mx-auto px-4 w-full">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-400 font-bold mb-6 flex gap-2">
          <Link href="/" className="hover:text-white">Home</Link> /
          <Link href="/blogs" className="hover:text-white">Diaries</Link> /
          <span className="text-primary">{blog.title}</span>
        </div>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-primary/10 border border-primary/20 text-primary px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {blog.category}
          </span>
          <span className="bg-white/5 border border-white/10 text-gray-300 px-3.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {blog.state}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author / Date Info */}
        <div className="flex items-center gap-4 text-xs text-gray-400 font-bold mb-10 pb-6 border-b border-white/15">
          <div className="flex items-center gap-1.5">
            <User className="h-4.5 w-4.5 text-primary" />
            <span>By {blog.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4.5 w-4.5 text-primary" />
            <span>{blog.readTime} reading time</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4.5 w-4.5 text-primary" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Hero cover image */}
        <div className="relative h-[400px] w-full rounded-3xl overflow-hidden border border-white/10 mb-10 shadow-md">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        {/* Content body */}
        <div className="text-gray-300 text-base leading-relaxed space-y-6 font-medium">
          <p>{blog.content}</p>
          <p className="border-l-2 border-primary pl-4 italic text-gray-400">
            "Travel makes one modest. You see what a tiny place you occupy in the world."
          </p>
          <p>Whether it is exploring the heritage forts, or finding peace inside forest temples, India challenges and rewrites your perspective. It is truly a land of experiences that will remain with you for a lifetime.</p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
