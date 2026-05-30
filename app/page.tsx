import React from 'react';
import { prisma } from '@/lib/prisma';
import HomeClient from './HomeClient';

// Ensure the page renders dynamically on requests
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Query seeded databases
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const packages = await prisma.package.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <HomeClient 
      destinations={destinations}
      packages={packages}
      events={events}
      blogs={blogs}
    />
  );
}
