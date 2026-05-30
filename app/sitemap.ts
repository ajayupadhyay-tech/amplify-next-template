import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://incredibleindia.com';

  const packages = await prisma.package.findMany({ select: { id: true, createdAt: true } });
  const blogs = await prisma.blog.findMany({ select: { id: true, createdAt: true } });

  const packageUrls = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: pkg.createdAt,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.id}`,
    lastModified: blog.createdAt,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/regions`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/plan`,
      lastModified: new Date(),
    },
    ...packageUrls,
    ...blogUrls,
  ];
}
