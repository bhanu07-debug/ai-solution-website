
import { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aisolution.com'; // Replace with your actual domain
  
  const staticRoutes = [
    '',
    '/services',
    '/projects',
    '/blog',
    '/gallery',
    '/events',
    '/careers',
    '/contact',
    '/feedback',
    '/admin/login',
  ];

  // In a real app, you would fetch dynamic routes (e.g., blog posts, project details) from your database
  // For now, we will just use the static routes.

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return sitemapEntries;
}
