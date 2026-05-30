'use client';

import React from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center items-center';

  return (
    <div className={`flex flex-col gap-3 mb-16 max-w-3xl ${alignClass} ${align === 'center' ? 'mx-auto' : ''} ${className}`}>
      <span className="text-[10px] md:text-xs font-black tracking-widest text-primary uppercase bg-primary/10 px-3.5 py-1.5 rounded-full w-max">
        {eyebrow}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-navy tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-500 font-medium leading-relaxed mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
