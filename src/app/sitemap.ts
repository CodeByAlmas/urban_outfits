import { MetadataRoute } from 'next';
import { getProductsFromSupabase } from '@/data/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://urbanoutfits.in';

  // Static routes
  const staticRoutes = ['', '/shop', '/collections', '/favorites'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes from Supabase
  let productRoutes: any[] = [];
  try {
    const products = await getProductsFromSupabase();
    productRoutes = Object.values(products).map((product) => ({
      url: `${baseUrl}/shop/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap product fetch error", e);
  }

  return [...staticRoutes, ...productRoutes];
}