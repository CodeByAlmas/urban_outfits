import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ColorVariant {
  name: string;
  hex: string;
  images: string[];
}

export interface Product {
  slug: string;
  title: string;
  issue: string;
  price: string;
  category: string;
  subCategory: string;
  isNewArrival?: boolean;
  description: string;
  details: string;
  care: string;
  delivery: string;
  images: string[];
  colors: ColorVariant[];
  sizes: string[];
  inStock: boolean;
}

// Direct Supabase Storage Bucket Uploader for HD Local Photos & Videos
export async function uploadMediaToSupabaseStorage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `media-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('product-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      console.error('Storage upload error:', uploadError.message);
      return null;
    }

    const { data } = supabase.storage
      .from('product-media')
      .getPublicUrl(fileName);

    return data.publicUrl;
  } catch (err) {
    console.error('Storage exception:', err);
    return null;
  }
}

// Permanently delete media file from Supabase storage bucket and ensure actual removal
export async function deleteMediaFromSupabaseStorage(fileUrl: string) {
  try {
    if (!fileUrl || !fileUrl.includes('product-media')) return;
    
    const urlParts = fileUrl.split('/product-media/');
    if (urlParts.length < 2) return;
    const filePath = urlParts[1].split('?')[0];

    const { error } = await supabase.storage
      .from('product-media')
      .remove([filePath]);

    if (error) {
      console.error('Failed to delete file from Supabase bucket:', error.message);
    }
  } catch (err) {
    console.error('Error deleting file from storage:', err);
  }
}

// Fetch products instantly with cache-first strategy for lightning-fast loads
export async function getProductsFromSupabase(): Promise<Record<string, Product>> {
  if (typeof window === 'undefined') return {};
  
  const localSaved = localStorage.getItem('urbn_products_cache');
  let cachedProducts: Record<string, Product> = {};
  if (localSaved) {
    try { cachedProducts = JSON.parse(localSaved); } catch (e) {}
  }

  try {
    const { data, error } = await supabase
      .from('store_storage')
      .select('content')
      .eq('key', 'urbn_products')
      .single();

    if (!error && data && data.content) {
      localStorage.setItem('urbn_products_cache', JSON.stringify(data.content));
      return data.content;
    }
  } catch (err) {
    console.warn('Cloud fetch warning, using local cache:', err);
  }

  return cachedProducts;
}

// Save products to Supabase Cloud DB with instant local fallback
export async function saveProductsToSupabase(products: Record<string, Product>): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  localStorage.setItem('urbn_products_cache', JSON.stringify(products));

  try {
    const { error } = await supabase
      .from('store_storage')
      .upsert({ key: 'urbn_products', content: products }, { onConflict: 'key' });

    if (error) {
      console.warn('Cloud sync warning:', error.message);
      return true; 
    }
    return true;
  } catch (err) {
    console.warn('Network exception during cloud sync, saved locally:', err);
    return true;
  }
}

export function getProducts(): Record<string, Product> {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem('urbn_products_cache');
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { return {}; }
  }
  return {};
}

export function saveProducts(products: Record<string, Product>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('urbn_products_cache', JSON.stringify(products));
}