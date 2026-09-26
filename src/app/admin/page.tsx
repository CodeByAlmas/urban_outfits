'use client';

import React, { useState, useEffect } from 'react';
import { getProductsFromSupabase, saveProductsToSupabase, uploadMediaToSupabaseStorage, deleteMediaFromSupabaseStorage, Product, ColorVariant } from '@/data/products';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'dashboard' | 'forgot'>('login');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'cms' | 'orders'>('overview');
  
  const [passwordInput, setPasswordInput] = useState('');
  const [recoveryInput, setRecoveryInput] = useState('');
  
  const [adminPass, setAdminPass] = useState('URBN2026!');
  const [adminSecretPin, setAdminSecretPin] = useState('7777');

  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [uploadingState, setUploadingState] = useState<string | null>(null);

  // Custom Theme Popup Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('SYSTEM NOTICE');
  const [modalMessage, setModalMessage] = useState('');

  const showCustomAlert = (title: string, msg: string) => {
    setModalTitle(title);
    setModalMessage(msg);
    setModalOpen(true);
  };

  const [siteContent, setSiteContent] = useState({
    homeTitle: "DIFFERENT PEOPLE. SAME URBN.",
    homeSubtitle: "Structure meets street. Designed for movement, built for the now.",
    heroVideoUrl: "/hero-background.mp4",
    categoryBannerImage: "/placeholder-1.jpg",
    announcementText: "⚡ FLASH DROP: FREE SHIPPING PAN-INDIA ON ORDERS ABOVE ₹2,999",
    announcementBgColor: "#ED3833",
    saleModeActive: true,
    legalTerms: "Welcome to URBN (urbn.studio)...",
    shippingInfo: "Standard express shipping across India..."
  });

  const [formData, setFormData] = useState<Product>({
    slug: '',
    title: '',
    issue: 'ISSUE 01',
    price: '₹ 4,990',
    category: 'BOTTOMS',
    subCategory: 'BOOT CUT JEANS',
    isNewArrival: false,
    description: '',
    details: '',
    care: '',
    delivery: '',
    images: ['/placeholder-1.jpg'],
    colors: [], 
    sizes: ['28', '30', '32', '34'],
    inStock: true
  });

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const auth = sessionStorage.getItem('urbn_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setViewMode('dashboard');
    }

    const savedPass = localStorage.getItem('urbn_admin_pass');
    const savedPin = localStorage.getItem('urbn_admin_pin');
    const savedMaint = localStorage.getItem('urbn_maintenance_mode');
    if (savedPass) setAdminPass(savedPass);
    if (savedPin) setAdminSecretPin(savedPin);
    if (savedMaint) setMaintenanceMode(savedMaint === 'true');

    const savedCms = localStorage.getItem('urbn_site_cms');
    if (savedCms) {
      try { setSiteContent(JSON.parse(savedCms)); } catch(e) {}
    }

    const savedOrders = localStorage.getItem('urbn_cart');
    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch(e) {}
    }

    getProductsFromSupabase().then(data => setProducts(data));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentTime = Date.now();
    if (lockoutTime > currentTime) {
      showCustomAlert("ACCESS LOCKED", "TRY AGAIN LATER");
      return;
    }

    if (passwordInput === adminPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem('urbn_admin_auth', 'true');
      setViewMode('dashboard');
    } else {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts + 1 >= 5) setLockoutTime(Date.now() + 30000);
      showCustomAlert("AUTHENTICATION FAILED", "INVALID CREDENTIALS PROVIDED");
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('urbn_admin_auth');
    setIsAuthenticated(false);
    setViewMode('login');
    setPasswordInput('');
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryInput === adminSecretPin) {
      const newPassword = prompt("Enter your NEW password (min 6 chars):");
      if (newPassword && newPassword.trim().length >= 6) {
        setAdminPass(newPassword);
        localStorage.setItem('urbn_admin_pass', newPassword);
        showCustomAlert("SUCCESS", "PASSWORD UPDATED SUCCESSFULLY");
        setViewMode('login');
        setRecoveryInput('');
      } else {
        showCustomAlert("ERROR", "PASSWORD MUST BE AT LEAST 6 CHARACTERS");
      }
    } else {
      showCustomAlert("ERROR", "INVALID RECOVERY PIN");
      setRecoveryInput('');
    }
  };

  // Helper to reassign ascending issue numbers across products
  const reassignIssueNumbers = (prodMap: Record<string, Product>): Record<string, Product> => {
    const sortedEntries = Object.entries(prodMap);
    const updatedMap: Record<string, Product> = {};
    sortedEntries.forEach(([slug, prod], index) => {
      const numStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      updatedMap[slug] = {
        ...prod,
        issue: `ISSUE ${numStr}`
      };
    });
    return updatedMap;
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      showCustomAlert("VALIDATION ERROR", "PRODUCT TITLE IS REQUIRED");
      return;
    }
    
    // Check New Arrival limit (Max 5)
    if (formData.isNewArrival) {
      const currentNewArrivalsCount = Object.values(products).filter(p => p.isNewArrival && p.slug !== isEditing).length;
      if (currentNewArrivalsCount >= 5) {
        showCustomAlert("LIMIT REACHED", "ALREADY 5 NEW ARRIVALS ACTIVE. UNCHECK ANOTHER NEW ARRIVAL TO ADD THIS ONE.");
        return;
      }
    }

    const finalSlug = formData.slug && formData.slug.trim() !== '' 
      ? formData.slug 
      : `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-6)}`;

    // Filter out empty general image fields if color variants are present
    const cleanedImages = formData.images.filter(img => img && img.trim() !== '');
    const finalImages = cleanedImages.length > 0 ? cleanedImages : (formData.colors.length > 0 ? [] : ['/placeholder-1.jpg']);

    const finalProduct: Product = {
      ...formData,
      slug: finalSlug,
      images: finalImages,
      description: formData.description.trim() || "Structure meets street. Designed for movement, built for the now.",
      details: formData.details.trim() || "Wide-leg architectural silhouette crafted from premium heavy cotton blend.",
      care: formData.care.trim() || "Dry clean only. Do not bleach. Iron on low heat.",
      delivery: formData.delivery.trim() || "Express delivery across India within 2-4 business days."
    };

    let updatedCatalog = { ...products, [finalSlug]: finalProduct };
    updatedCatalog = reassignIssueNumbers(updatedCatalog);
    
    const success = await saveProductsToSupabase(updatedCatalog);
    if (success) {
      setProducts(updatedCatalog);
      setIsEditing(null);
      showCustomAlert("CLOUD SYNC", "SUCCESS: PRODUCT SYNCED TO SUPABASE CLOUD & INSTANTLY LIVE");
    }
  };

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('urbn_site_cms', JSON.stringify(siteContent));
    showCustomAlert("CMS SYNC", "SUCCESS: HOMEPAGE, CMS & SALE TICKER UPDATED");
  };

  const handleToggleMaintenance = () => {
    const nextState = !maintenanceMode;
    setMaintenanceMode(nextState);
    localStorage.setItem('urbn_maintenance_mode', String(nextState));
  };

  const handleDelete = async (slug: string) => {
    if (confirm("[ ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT & ITS IMAGES FROM CLOUD? ]")) {
      const productToDelete = products[slug];
      if (productToDelete) {
        if (productToDelete.images) {
          for (const imgUrl of productToDelete.images) {
            await deleteMediaFromSupabaseStorage(imgUrl);
          }
        }
        if (productToDelete.colors) {
          for (const col of productToDelete.colors) {
            if (col.images) {
              for (const cImg of col.images) {
                await deleteMediaFromSupabaseStorage(cImg);
              }
            }
          }
        }
      }

      let updatedCatalog = { ...products };
      delete updatedCatalog[slug];
      updatedCatalog = reassignIssueNumbers(updatedCatalog);

      const success = await saveProductsToSupabase(updatedCatalog);
      if (success) {
        setProducts(updatedCatalog);
        showCustomAlert("DELETION SUCCESS", "PRODUCT & ASSOCIATED MEDIA PERMANENTLY DELETED FROM CLOUD & BUCKET. ISSUE NUMBERS REASSIGNED.");
      }
    }
  };

  const handleToggleStock = async (slug: string) => {
    const product = products[slug];
    if (!product) return;
    const updatedCatalog = {
      ...products,
      [slug]: { ...product, inStock: !product.inStock }
    };
    const success = await saveProductsToSupabase(updatedCatalog);
    if (success) {
      setProducts(updatedCatalog);
    }
  };

  const handleAddNew = () => {
    const autoSlug = `urbn-item-${Date.now().toString().slice(-6)}`;
    const nextIssueNum = Object.keys(products).length + 1;
    const formattedIssue = nextIssueNum < 10 ? `0${nextIssueNum}` : `${nextIssueNum}`;
    
    setFormData({
      slug: autoSlug,
      title: '',
      issue: `ISSUE ${formattedIssue}`,
      price: '₹ 4,990',
      category: 'BOTTOMS',
      subCategory: 'BOOT CUT JEANS',
      isNewArrival: false,
      description: '',
      details: '',
      care: '',
      delivery: '',
      images: ['/placeholder-1.jpg'],
      colors: [],
      sizes: ['28', '30', '32', '34'],
      inStock: true
    });
    setIsEditing('new');
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleFileUploadGeneral = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(`general-${index}`);
    const publicUrl = await uploadMediaToSupabaseStorage(file);
    setUploadingState(null);

    if (publicUrl) {
      handleImageChange(index, publicUrl);
    }
  };

  const handleAddImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleColorFieldChange = (colorIdx: number, field: keyof ColorVariant, value: any) => {
    const newColors = [...formData.colors];
    newColors[colorIdx] = { ...newColors[colorIdx], [field]: value };
    setFormData({ ...formData, colors: newColors });
  };

  const handleColorImageChange = (colorIdx: number, imgIdx: number, value: string) => {
    const newColors = [...formData.colors];
    const newImages = [...newColors[colorIdx].images];
    newImages[imgIdx] = value;
    newColors[colorIdx].images = newImages;
    setFormData({ ...formData, colors: newColors });
  };

  const handleColorImageUpload = async (colorIdx: number, imgIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingState(`color-${colorIdx}-${imgIdx}`);
    const publicUrl = await uploadMediaToSupabaseStorage(file);
    setUploadingState(null);

    if (publicUrl) {
      handleColorImageChange(colorIdx, imgIdx, publicUrl);
    }
  };

  const handleAddColorImage = (colorIdx: number) => {
    const newColors = [...formData.colors];
    newColors[colorIdx].images.push('');
    setFormData({ ...formData, colors: newColors });
  };

  const handleRemoveColorImage = (colorIdx: number, imgIdx: number) => {
    const newColors = [...formData.colors];
    const newImages = newColors[colorIdx].images.filter((_, i) => i !== imgIdx);
    newColors[colorIdx].images = newImages;
    setFormData({ ...formData, colors: newColors });
  };

  const handleAddColor = () => {
    setFormData({ 
      ...formData, 
      colors: [...formData.colors, { name: '', hex: '#111111', images: [''] }] 
    });
  };

  const handleRemoveColor = (index: number) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  const handleSizeStringChange = (val: string) => {
    const sizesArray = val.split(',').map(s => s.trim()).filter(Boolean);
    setFormData({ ...formData, sizes: sizesArray });
  };

  if (viewMode === 'login' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-black p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold uppercase">[ SECURE CLOUD ACCESS ]</span>
            <h1 className="font-thunder text-3xl font-black uppercase mt-1">URBN MASTER ADMIN</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">[ PASSWORD ]</label>
              <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="••••••••••••" className="w-full bg-neutral-100 border border-black/40 p-3 text-xs uppercase" required />
            </div>
            <button type="submit" className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] cursor-pointer">
              AUTHENTICATE →
            </button>
            <div className="text-center pt-2">
              <button type="button" onClick={() => setViewMode('forgot')} className="text-[10px] text-neutral-500 underline uppercase cursor-pointer">Forgot Password?</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (viewMode === 'forgot' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border-2 border-black p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="font-thunder text-3xl font-black uppercase">RESET PASSWORD</h1>
          </div>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">[ RECOVERY PIN ]</label>
              <input type="password" value={recoveryInput} onChange={(e) => setRecoveryInput(e.target.value)} placeholder="7777" className="w-full bg-neutral-100 border border-black/40 p-3 text-xs text-center tracking-widest font-bold" required />
            </div>
            <button type="submit" className="w-full bg-[#ED3833] text-white py-3 text-xs uppercase tracking-widest font-bold cursor-pointer">VERIFY PIN →</button>
            <div className="text-center pt-2">
              <button type="button" onClick={() => setViewMode('login')} className="text-[10px] text-neutral-500 underline uppercase cursor-pointer">Back to Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom p-4 sm:p-6 md:p-12 select-none">
      
      {/* Custom Theme Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black p-8 max-w-md w-full shadow-2xl space-y-4 text-center">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold uppercase">[ {modalTitle} ]</span>
            <h3 className="font-thunder text-3xl font-black uppercase">URBN SYSTEM NOTIFICATION</h3>
            <p className="text-xs uppercase tracking-wider text-neutral-700 leading-relaxed font-bold">
              {modalMessage}
            </p>
            <button 
              onClick={() => setModalOpen(false)}
              className="w-full bg-black text-white py-3 text-xs uppercase font-bold tracking-widest hover:bg-[#ED3833] transition-colors cursor-pointer"
            >
              OKAY →
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-black pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#ED3833] font-bold">[ SUPABASE CLOUD DATABASE // ACTIVE ]</span>
            <h1 className="font-thunder text-3xl sm:text-5xl uppercase font-black mt-1">URBN MASTER CONTROL</h1>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button onClick={handleToggleMaintenance} className={`flex-1 sm:flex-none px-4 py-3 text-xs uppercase font-bold border cursor-pointer ${maintenanceMode ? 'bg-red-600 text-white' : 'bg-white text-black'}`}>
              {maintenanceMode ? '[ MAINTENANCE: ON ]' : '[ STORE: LIVE ]'}
            </button>
            <button onClick={handleLogout} className="flex-1 sm:flex-none bg-black text-white px-5 py-3 text-xs uppercase font-bold hover:bg-[#ED3833] cursor-pointer">LOGOUT ⏻</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-black/20 pb-4 overflow-x-auto">
          <button onClick={() => setActiveTab('overview')} className={`px-4 sm:px-5 py-2.5 text-xs uppercase font-bold cursor-pointer whitespace-nowrap ${activeTab === 'overview' ? 'bg-black text-white' : 'bg-white border'}`}>[ 01. OVERVIEW ]</button>
          <button onClick={() => setActiveTab('products')} className={`px-4 sm:px-5 py-2.5 text-xs uppercase font-bold cursor-pointer whitespace-nowrap ${activeTab === 'products' ? 'bg-black text-white' : 'bg-white border'}`}>[ 02. INVENTORY ]</button>
          <button onClick={() => setActiveTab('cms')} className={`px-4 sm:px-5 py-2.5 text-xs uppercase font-bold cursor-pointer whitespace-nowrap ${activeTab === 'cms' ? 'bg-black text-white' : 'bg-white border'}`}>[ 03. PAGE CMS ]</button>
          <button onClick={() => setActiveTab('orders')} className={`px-4 sm:px-5 py-2.5 text-xs uppercase font-bold cursor-pointer whitespace-nowrap ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white border'}`}>[ 04. ORDERS ({orders.length}) ]</button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-black p-6">
              <span className="text-[10px] uppercase text-neutral-500">[ CLOUD PRODUCTS ]</span>
              <div className="font-thunder text-5xl font-black mt-2">{Object.keys(products).length}</div>
            </div>
            <div className="bg-white border-2 border-black p-6">
              <span className="text-[10px] uppercase text-neutral-500">[ BAG ORDERS ]</span>
              <div className="font-thunder text-5xl font-black mt-2 text-[#ED3833]">{orders.length}</div>
            </div>
            <div className="bg-white border-2 border-black p-6">
              <span className="text-[10px] uppercase text-neutral-500">[ SECURITY ]</span>
              <div className="font-thunder text-3xl font-black mt-2 text-green-600">SUPABASE CLOUD SECURE</div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-sm font-bold uppercase">CLOUD PRODUCT CATALOG & VARIANTS</h2>
              <button onClick={handleAddNew} className="w-full sm:w-auto bg-black text-white px-5 py-3 text-xs uppercase font-bold hover:bg-[#ED3833] cursor-pointer">+ ADD NEW PRODUCT</button>
            </div>

            {isEditing && (
              <div className="bg-white border-2 border-black p-4 sm:p-8 mb-12 shadow-xl">
                <h3 className="text-sm font-bold uppercase mb-6 border-b pb-2">{isEditing === 'new' ? 'New Product' : `Editing: ${formData.title}`}</h3>
                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs uppercase">
                  
                  <div className="space-y-1">
                    <label className="font-bold">Product ID / Slug (Auto-Generated):</label>
                    <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full bg-neutral-100 border p-2.5 uppercase text-neutral-500" placeholder="Auto-generated if left blank" />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Product Title / Name:</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="E.G. TECHWEAR JACKET" className="w-full bg-neutral-100 border p-2.5 uppercase font-bold" required />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Price:</label>
                    <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="₹ 4,990" className="w-full bg-neutral-100 border p-2.5 uppercase" required />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Category:</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-neutral-100 border p-2.5 uppercase font-bold text-[#ED3833]">
                      <option value="BOTTOMS">BOTTOMS</option>
                      <option value="TOPS">TOPS</option>
                      <option value="OUTERWEAR">OUTERWEAR</option>
                      <option value="SETS">SETS</option>
                      <option value="ACCESSORIES">ACCESSORIES</option>
                      <option value="FOOTWEAR">FOOTWEAR</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Sub-Category (e.g. BOOT CUT JEANS, BAGGY):</label>
                    <input type="text" value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} placeholder="BOOT CUT JEANS" className="w-full bg-neutral-100 border p-2.5 uppercase font-bold" />
                  </div>

                  <div className="space-y-1 flex items-center gap-3 pt-4">
                    <input 
                      type="checkbox" 
                      id="newArrivalToggle"
                      checked={formData.isNewArrival ?? false} 
                      onChange={(e) => setFormData({...formData, isNewArrival: e.target.checked})} 
                      className="w-4 h-4 accent-[#ED3833] cursor-pointer" 
                    />
                    <label htmlFor="newArrivalToggle" className="font-bold cursor-pointer">Show in New Arrivals / Homepage (Max 5)</label>
                  </div>

                  {/* Sizes Manager */}
                  <div className="md:col-span-2 space-y-1">
                    <label className="font-bold">Size Variants (Comma Separated e.g. 28, 30, 32, 34 or S, M, L):</label>
                    <input 
                      type="text" 
                      value={formData.sizes.join(', ')} 
                      onChange={(e) => handleSizeStringChange(e.target.value)} 
                      placeholder="28, 30, 32, 34" 
                      className="w-full bg-neutral-100 border p-2.5 uppercase font-bold" 
                      required 
                    />
                  </div>

                  {/* Optional Color Variants Manager */}
                  <div className="md:col-span-2 space-y-3 border-t border-black/20 pt-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <label className="font-bold block text-sm">Color Variants (Optional):</label>
                      <button type="button" onClick={handleAddColor} className="w-full sm:w-auto text-[10px] bg-black text-white px-4 py-2 uppercase font-bold hover:bg-[#ED3833] cursor-pointer">+ Add Color Variant</button>
                    </div>
                    <p className="text-[10px] text-neutral-500">By default no colors are selected. Add only if this article has distinct color choices.</p>
                    
                    {formData.colors.map((colorItem, colorIdx) => (
                      <div key={colorIdx} className="bg-neutral-100 p-4 border border-black/20 space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                          <input 
                            type="text" 
                            value={colorItem.name} 
                            onChange={(e) => handleColorFieldChange(colorIdx, 'name', e.target.value)} 
                            placeholder="COLOR NAME (E.G. JET BLACK)" 
                            className="flex-1 bg-white border p-2.5 text-xs uppercase font-bold" 
                            required 
                          />
                          <div className="flex items-center justify-between sm:justify-start gap-2">
                            <input 
                              type="color" 
                              value={colorItem.hex} 
                              onChange={(e) => handleColorFieldChange(colorIdx, 'hex', e.target.value)} 
                              className="w-10 h-9 border cursor-pointer bg-white" 
                            />
                            <span className="text-[10px] font-mono">{colorItem.hex}</span>
                          </div>
                          <button type="button" onClick={() => handleRemoveColor(colorIdx)} className="bg-red-600 text-white px-3 py-2 text-xs font-bold cursor-pointer">DELETE COLOR</button>
                        </div>

                        {/* Multiple Images for this Color */}
                        <div className="space-y-2 pl-2 sm:pl-4 border-l-2 border-black/20">
                          <label className="text-[11px] font-bold block text-neutral-700">Photos for {colorItem.name || 'this color'}:</label>
                          {colorItem.images.map((imgSrc, imgIdx) => (
                            <div key={imgIdx} className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
                              <input 
                                type="text" 
                                value={imgSrc} 
                                onChange={(e) => handleColorImageChange(colorIdx, imgIdx, e.target.value)} 
                                placeholder="Image URL or local attach" 
                                className="flex-1 bg-white border p-2 text-xs truncate" 
                                required 
                              />
                              <label className="cursor-pointer bg-black text-white hover:bg-[#ED3833] border px-3 py-2 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap">
                                <span>{uploadingState === `color-${colorIdx}-${imgIdx}` ? '⏳ UPLOADING...' : '📎 UPLOAD LOCAL'}</span>
                                <input type="file" accept="image/*" onChange={(e) => handleColorImageUpload(colorIdx, imgIdx, e)} className="hidden" disabled={uploadingState !== null} />
                              </label>
                              {colorItem.images.length > 1 && (
                                <button type="button" onClick={() => handleRemoveColorImage(colorIdx, imgIdx)} className="bg-red-600 text-white px-3 py-2 text-xs font-bold">REMOVE</button>
                              )}
                            </div>
                          ))}
                          <button type="button" onClick={() => handleAddColorImage(colorIdx)} className="text-[10px] bg-neutral-800 text-white px-3 py-1.5 uppercase font-bold hover:bg-black">+ Add Photo for {colorItem.name || 'Color'}</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* General Product Media (Optional if color variants exist) */}
                  <div className="md:col-span-2 space-y-2 border-t border-black/20 pt-4">
                    <label className="font-bold block">General Product Media (Optional if Color Variants provided):</label>
                    {formData.images.map((imgUrl, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row gap-2 mb-2 items-stretch sm:items-center">
                        <input type="text" value={imgUrl} onChange={(e) => handleImageChange(idx, e.target.value)} placeholder="https://... or attached file" className="flex-1 bg-neutral-100 border p-2.5 text-xs truncate" />
                        
                        <label className="cursor-pointer bg-black text-white hover:bg-[#ED3833] border px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1 transition-colors whitespace-nowrap">
                          <span>{uploadingState === `general-${idx}` ? '⏳ UPLOADING...' : '📎 UPLOAD LOCAL'}</span>
                          <input type="file" accept="image/*,video/*" onChange={(e) => handleFileUploadGeneral(idx, e)} className="hidden" disabled={uploadingState !== null} />
                        </label>

                        {formData.images.length > 1 && (
                          <button type="button" onClick={() => handleRemoveImageField(idx)} className="bg-red-600 text-white px-3 py-2.5 font-bold cursor-pointer">REMOVE</button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={handleAddImageField} className="text-[10px] bg-black text-white px-4 py-2 uppercase font-bold hover:bg-[#ED3833] cursor-pointer">+ Add General Image Field</button>
                  </div>

                  {/* Description, Details, Care, Delivery */}
                  <div className="md:col-span-2 space-y-4 border-t border-black/20 pt-4">
                    <div className="space-y-1">
                      <label className="font-bold">Description:</label>
                      <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter description..." className="w-full bg-neutral-100 border p-3 uppercase h-20" />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold">Details (Optional - Auto-defaults if empty):</label>
                      <textarea value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} placeholder="Wide-leg silhouette with architectural folds..." className="w-full bg-neutral-100 border p-3 uppercase h-20" />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold">Care Instructions (Optional - Auto-defaults if empty):</label>
                      <input type="text" value={formData.care} onChange={(e) => setFormData({...formData, care: e.target.value})} placeholder="Dry clean only. Do not bleach." className="w-full bg-neutral-100 border p-2.5 uppercase" />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold">Delivery Info (Optional - Auto-defaults if empty):</label>
                      <input type="text" value={formData.delivery} onChange={(e) => setFormData({...formData, delivery: e.target.value})} placeholder="Express shipping in 2-4 days." className="w-full bg-neutral-100 border p-2.5 uppercase" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button type="submit" className="bg-black text-white px-6 py-3.5 font-bold hover:bg-[#ED3833] cursor-pointer">SAVE TO CLOUD</button>
                    <button type="button" onClick={() => setIsEditing(null)} className="border border-black px-6 py-3.5 font-bold cursor-pointer">CANCEL</button>
                  </div>

                </form>
              </div>
            )}

            <div className="bg-white border-2 border-black overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs uppercase min-w-[700px]">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-4">Issue & Product Name</th>
                    <th className="p-4">Category & Sub-Category</th>
                    <th className="p-4">New Arrival</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {Object.values(products).map((product) => (
                    <tr key={product.slug} className="hover:bg-neutral-50">
                      <td className="p-4">
                        <span className="text-[10px] text-[#ED3833] font-bold block">[ {product.issue || 'ISSUE 01'} ]</span>
                        <span className="font-bold text-black">{product.title}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-black">{product.category}</span>
                        <span className="block text-[10px] text-[#ED3833]">↳ {product.subCategory || 'GENERAL'}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-[9px] font-bold ${product.isNewArrival === true ? 'bg-black text-white' : 'bg-neutral-200 text-neutral-600'}`}>
                          {product.isNewArrival === true ? 'YES' : 'NO'}
                        </span>
                      </td>
                      <td className="p-4 font-bold">{product.price}</td>
                      <td className="p-4">
                        <button onClick={() => handleToggleStock(product.slug)} className={`px-3 py-1 text-[10px] font-bold cursor-pointer transition-transform hover:scale-105 ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button onClick={() => { setFormData(product); setIsEditing(product.slug); }} className="underline hover:text-[#ED3833] font-bold cursor-pointer">EDIT</button>
                        <button onClick={() => handleDelete(product.slug)} className="underline text-red-600 font-bold cursor-pointer">DELETE</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'cms' && (
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase mb-6 border-b pb-2">ADVANCED PAGE CMS & SALE CONTROLS</h2>
            <form onSubmit={handleSaveCms} className="space-y-6 text-xs uppercase">
              
              <div className="space-y-1">
                <label className="font-bold">Home Page Banner Headline:</label>
                <input type="text" value={siteContent.homeTitle} onChange={(e) => setSiteContent({...siteContent, homeTitle: e.target.value})} className="w-full bg-neutral-100 border p-3 uppercase" required />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Homepage Subtitle / Manifesto:</label>
                <textarea value={siteContent.homeSubtitle} onChange={(e) => setSiteContent({...siteContent, homeSubtitle: e.target.value})} className="w-full bg-neutral-100 border p-3 uppercase h-20" required />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Announcement Marquee / Conveyer Belt Text (Sale / Flash Drop):</label>
                <input type="text" value={siteContent.announcementText} onChange={(e) => setSiteContent({...siteContent, announcementText: e.target.value})} className="w-full bg-neutral-100 border p-3 uppercase font-bold text-red-600" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold">Announcement Banner / Sale Theme Color:</label>
                  <div className="flex gap-3 items-center">
                    <input type="color" value={siteContent.announcementBgColor} onChange={(e) => setSiteContent({...siteContent, announcementBgColor: e.target.value})} className="w-12 h-10 border cursor-pointer" />
                    <span className="font-mono">{siteContent.announcementBgColor}</span>
                  </div>
                </div>

                <div className="space-y-1 flex items-center gap-3 pt-6">
                  <input type="checkbox" id="saleModeToggle" checked={siteContent.saleModeActive} onChange={(e) => setSiteContent({...siteContent, saleModeActive: e.target.checked})} className="w-5 h-5 accent-[#ED3833] cursor-pointer" />
                  <label htmlFor="saleModeToggle" className="font-bold cursor-pointer">Enable Sale / Conveyer Banner Mode</label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold">Homepage Category Showcase Banner Image URL:</label>
                <input type="text" value={siteContent.categoryBannerImage} onChange={(e) => setSiteContent({...siteContent, categoryBannerImage: e.target.value})} className="w-full bg-neutral-100 border p-3" required />
              </div>

              <button type="submit" className="w-full sm:w-auto bg-black text-white px-6 py-3.5 font-bold hover:bg-[#ED3833] cursor-pointer">
                UPDATE HOMEPAGE & SALE CONTROLS →
              </button>
            </form>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white border-2 border-black p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase mb-6 border-b pb-2">CUSTOMER BAG LOGS</h2>
            {orders.length === 0 ? <p className="text-xs text-neutral-500 py-12 text-center">[ NO ORDERS YET ]</p> : (
              <table className="w-full text-left text-xs uppercase">
                <thead className="bg-black text-white"><tr><th className="p-4">Item</th><th className="p-4">Price</th><th className="p-4">Size</th></tr></thead>
                <tbody className="divide-y">
                  {orders.map((o, idx) => (
                    <tr key={idx}><td className="p-4 font-bold">{o.title}</td><td className="p-4">{o.price}</td><td className="p-4">{o.size}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  );
}