export interface Product {
  slug: string;
  title: string;
  issue: string;
  price: string; // e.g., "₹3,499"
  description: string;
  details: string;
  care: string;
  delivery: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  inStock: boolean;
}

export const initialProducts: Record<string, Product> = {
  'architecture-trousers': {
    slug: 'architecture-trousers',
    title: "ARCHITECTURE TROUSERS.",
    issue: "ISSUE 03",
    price: "₹34,999",
    description: "Structure meets street. Designed for movement, built for the now.",
    details: "Wide-leg silhouette with architectural folds. Premium fabric. Minimal design. Maximum presence.",
    care: "Dry clean only. Do not bleach. Cool iron on reverse if necessary.",
    delivery: "Ships in 1–2 business days. Express pan-India shipping available at checkout.",
    images: ["/placeholder-1.jpg", "/placeholder-2.jpg", "/placeholder-3.jpg", "/placeholder-4.jpg"],
    colors: [{ name: "BLACK", hex: "#111111" }],
    sizes: ["XS", "S", "M", "L"],
    inStock: true
  },
  'heavyweight-hoodie': {
    slug: 'heavyweight-hoodie',
    title: "HEAVYWEIGHT HOODIE.",
    issue: "ISSUE 04",
    price: "₹18,499",
    description: "Raw exterior, ultra-soft interior. Built for eternal wear.",
    details: "450GSM French Terry cotton. Oversized boxy fit. Double-layered hood with zero drawstrings.",
    care: "Machine wash cold inside out. Tumble dry low.",
    delivery: "Ships in 1–2 business days.",
    images: ["/placeholder-1.jpg", "/placeholder-2.jpg", "/placeholder-3.jpg", "/placeholder-4.jpg"],
    colors: [{ name: "BLACK", hex: "#111111" }, { name: "WASHED GREY", hex: "#555555" }],
    sizes: ["S", "M", "L", "XL"],
    inStock: true
  }
};

// Helper to get products (checks localStorage if admin updated anything)
export function getProducts(): Record<string, Product> {
  if (typeof window === 'undefined') return initialProducts;
  const saved = localStorage.getItem('urban_outfits_products');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return initialProducts;
    }
  }
  localStorage.setItem('urban_outfits_products', JSON.stringify(initialProducts));
  return initialProducts;
}

// Helper to save products from Admin Panel
export function saveProducts(products: Record<string, Product>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('urban_outfits_products', JSON.stringify(products));
}