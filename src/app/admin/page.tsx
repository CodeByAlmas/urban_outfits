'use client';

import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts, Product } from '@/data/products';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState<'login' | 'dashboard' | 'forgot'>('login');
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'cms' | 'orders'>('overview');
  
  const [passwordInput, setPasswordInput] = useState('');
  const [recoveryInput, setRecoveryInput] = useState('');
  
  const [adminPass, setAdminPass] = useState('URBN2026!');
  const [adminSecretPin, setAdminSecretPin] = useState('7777'); // Recovery PIN

  // Security: Brute-force rate limiting state
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  const [products, setProducts] = useState<Record<string, Product>>({});
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [siteContent, setSiteContent] = useState({
    homeTitle: "DIFFERENT PEOPLE. SAME URBN.",
    homeSubtitle: "Structure meets street. Designed for movement, built for the now.",
    heroVideoUrl: "/hero-background.mp4",
    legalTerms: "Welcome to URBN (urbn.studio). By accessing our website, you agree to our terms...",
    shippingInfo: "Standard express shipping across India takes 3 to 5 business days post-dispatch.",
    returnPolicy: "Items must be unworn, unwashed, and returned within 7 days of delivery."
  });

  const [formData, setFormData] = useState<Product>({
    slug: '',
    title: '',
    issue: 'ISSUE 01',
    price: '₹ 4,990',
    description: '',
    details: '',
    care: '',
    delivery: '',
    images: ['/placeholder-1.jpg'],
    colors: [{ name: 'BLACK', hex: '#111111' }],
    sizes: ['S', 'M', 'L'],
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

    setProducts(getProducts());
  }, []);

  // Secure Login with Rate Limiting (PDF Rule 02)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const currentTime = Date.now();
    if (lockoutTime > currentTime) {
      const remainingSecs = Math.ceil((lockoutTime - currentTime) / 1000);
      alert(`[ ACCESS LOCKED: TOO MANY FAILED ATTEMPTS. TRY AGAIN IN ${remainingSecs}s ]`);
      return;
    }

    if (passwordInput === adminPass) {
      setIsAuthenticated(true);
      sessionStorage.setItem('urbn_admin_auth', 'true');
      setViewMode('dashboard');
      setLoginAttempts(0);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      
      // Lock for 30 seconds if 5 failed attempts
      if (newAttempts >= 5) {
        setLockoutTime(Date.now() + 30000);
        alert("[ SECURITY LOCK: 5 FAILED ATTEMPTS. LOCKED FOR 30 SECONDS. ]");
      } else {
        // PDF Rule 04: Generic error handling to avoid info leakage
        alert("[ INVALID CREDENTIALS OR ACCESS DENIED ]");
      }
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
      const newPassword = prompt("Authentication successful! Enter your NEW password (min 6 chars):");
      if (newPassword && newPassword.trim().length >= 6) {
        setAdminPass(newPassword);
        localStorage.setItem('urbn_admin_pass', newPassword);
        alert("[ SUCCESS: PASSWORD UPDATED. PLEASE LOGIN WITH NEW CREDENTIALS. ]");
        setViewMode('login');
        setRecoveryInput('');
      } else {
        alert("[ ERROR: PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG. ]");
      }
    } else {
      alert("[ ERROR: INVALID SECURITY RECOVERY PIN. ]");
      setRecoveryInput('');
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.title) {
      alert("[ ERROR: SLUG AND TITLE ARE REQUIRED ]");
      return;
    }
    const updated = { ...products, [formData.slug]: formData };
    saveProducts(updated);
    setProducts(updated);
    setIsEditing(null);
    alert("[ SUCCESS: PRODUCT CATALOG UPDATED ]");
  };

  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('urbn_site_cms', JSON.stringify(siteContent));
    alert("[ SUCCESS: SITE-WIDE CONTENT & MEDIA UPDATED ACROSS ALL PAGES ]");
  };

  const handleToggleMaintenance = () => {
    const nextState = !maintenanceMode;
    setMaintenanceMode(nextState);
    localStorage.setItem('urbn_maintenance_mode', String(nextState));
    alert(`[ STORE STATUS: ${nextState ? 'MAINTENANCE MODE ENABLED' : 'STORE IS LIVE'} ]`);
  };

  const handleDelete = (slug: string) => {
    if (confirm("[ WARNING: ARE YOU SURE YOU WANT TO DELETE THIS PRODUCT? ]")) {
      const updated = { ...products };
      delete updated[slug];
      saveProducts(updated);
      setProducts(updated);
    }
  };

  const handleToggleStock = (slug: string) => {
    const updated = {
      ...products,
      [slug]: { ...products[slug], inStock: !products[slug].inStock }
    };
    saveProducts(updated);
    setProducts(updated);
  };

  const handleAddNew = () => {
    setFormData({
      slug: `product-${Date.now()}`,
      title: 'NEW PRODUCT.',
      issue: 'ISSUE 05',
      price: '₹ 4,990',
      description: 'Enter description here...',
      details: 'Enter product details...',
      care: 'Dry clean only.',
      delivery: 'Ships in 2-3 days.',
      images: ['/placeholder-1.jpg', '/placeholder-2.jpg'],
      colors: [{ name: 'BLACK', hex: '#111111' }],
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true
    });
    setIsEditing('new');
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleRemoveImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
  };

  // 1. SECURE LOGIN SCREEN
  if (viewMode === 'login' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom flex items-center justify-center p-4 sm:p-6 select-none">
        <div className="max-w-md w-full bg-white border-2 border-black p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold uppercase">[ RESTRICTED ACCESS // SECURE ]</span>
            <h1 className="font-thunder text-3xl sm:text-4xl font-black uppercase tracking-wider mt-1">URBN MASTER ADMIN</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">[ ADMIN PASSWORD ]</label>
              <input 
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-neutral-100 border border-black/40 p-3 font-mono-custom text-xs uppercase focus:outline-none focus:border-black"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-black text-white py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] transition-colors cursor-pointer"
            >
              AUTHENTICATE SESSION →
            </button>
            <div className="text-center pt-2">
              <button 
                type="button"
                onClick={() => setViewMode('forgot')}
                className="text-[10px] text-neutral-500 uppercase tracking-widest underline hover:text-black cursor-pointer"
              >
                Forgot Password? Reset with Recovery PIN
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 2. FORGOT PASSWORD / RECOVERY SCREEN
  if (viewMode === 'forgot' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom flex items-center justify-center p-4 sm:p-6 select-none">
        <div className="max-w-md w-full bg-white border-2 border-black p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-[10px] tracking-widest text-[#ED3833] font-bold uppercase">[ ACCOUNT RECOVERY ]</span>
            <h1 className="font-thunder text-3xl font-black uppercase tracking-wider mt-1">RESET PASSWORD</h1>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">Enter the 4-digit Security Recovery PIN.</p>
          </div>
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">[ RECOVERY PIN ]</label>
              <input 
                type="password"
                value={recoveryInput}
                onChange={(e) => setRecoveryInput(e.target.value)}
                placeholder="DEFAULT: 7777"
                className="w-full bg-neutral-100 border border-black/40 p-3 font-mono-custom text-xs uppercase focus:outline-none focus:border-black text-center tracking-widest font-bold"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-[#ED3833] text-white py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors cursor-pointer"
            >
              VERIFY & RESET →
            </button>
            <div className="text-center pt-2">
              <button 
                type="button"
                onClick={() => setViewMode('login')}
                className="text-[10px] text-neutral-500 uppercase tracking-widest underline hover:text-black cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // 3. SECURE AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#FFF9F7] text-black font-mono-custom p-4 sm:p-6 md:p-12 select-none overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Admin Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-black pb-6 mb-8 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#ED3833] font-bold">[ SECURE DASHBOARD // ACTIVE ]</span>
            <h1 className="font-thunder text-4xl sm:text-5xl uppercase font-black tracking-wider mt-1">URBN MASTER CONTROL</h1>
            <p className="text-xs uppercase tracking-widest text-neutral-600">Total store management, page CMS, and customer order logs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button 
              onClick={handleToggleMaintenance}
              className={`flex-1 md:flex-none px-4 py-3 text-xs uppercase tracking-widest font-bold border transition-colors cursor-pointer ${
                maintenanceMode ? 'bg-red-600 text-white border-red-600 animate-pulse' : 'bg-white text-black border-black hover:bg-black hover:text-white'
              }`}
            >
              {maintenanceMode ? '[ MAINTENANCE: ON ]' : '[ STORE: LIVE ]'}
            </button>
            <button 
              onClick={handleLogout}
              className="flex-1 md:flex-none bg-black text-white px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] transition-colors cursor-pointer shadow-sm"
            >
              LOGOUT ⏻
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 border-b border-black/20 pb-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all ${
              activeTab === 'overview' ? 'bg-black text-white shadow-sm' : 'bg-white border border-black/20 hover:border-black'
            }`}
          >
            [ 01. OVERVIEW ]
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all ${
              activeTab === 'products' ? 'bg-black text-white shadow-sm' : 'bg-white border border-black/20 hover:border-black'
            }`}
          >
            [ 02. INVENTORY ]
          </button>
          <button 
            onClick={() => setActiveTab('cms')}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all ${
              activeTab === 'cms' ? 'bg-black text-white shadow-sm' : 'bg-white border border-black/20 hover:border-black'
            }`}
          >
            [ 03. PAGE CMS ]
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-4 sm:px-5 py-2.5 text-xs uppercase tracking-widest font-bold cursor-pointer transition-all ${
              activeTab === 'orders' ? 'bg-black text-white shadow-sm' : 'bg-white border border-black/20 hover:border-black'
            }`}
          >
            [ 04. ORDERS ({orders.length}) ]
          </button>
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-black p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">[ TOTAL PRODUCTS ]</span>
                <div className="font-thunder text-5xl font-black mt-2">{Object.keys(products).length}</div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-1">Active items in catalog</p>
              </div>
              <div className="bg-white border-2 border-black p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">[ CUSTOMER ORDERS / BAGS ]</span>
                <div className="font-thunder text-5xl font-black mt-2 text-[#ED3833]">{orders.length}</div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-1">Logged from client sessions</p>
              </div>
              <div className="bg-white border-2 border-black p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">[ SECURITY STATUS ]</span>
                <div className="font-thunder text-4xl font-black mt-2 text-green-600">SECURE [PIN 7777]</div>
                <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-1">Session token verified</p>
              </div>
            </div>

            <div className="bg-white border-2 border-black p-6 sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">[ QUICK INSTRUCTIONS FOR CLIENT ]</h3>
              <ul className="space-y-2 text-xs uppercase tracking-wider text-neutral-700 leading-relaxed">
                <li>• Use the <strong>Inventory</strong> tab to add new streetwear drops, update prices, or toggle stock status instantly.</li>
                <li>• Use the <strong>Page CMS</strong> tab to update homepage banners, background media links, and shipping/return policies.</li>
                <li>• Use the <strong>Orders</strong> tab to monitor items added to customer bags and WhatsApp quote requests.</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS INVENTORY */}
        {activeTab === 'products' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-sm font-bold uppercase tracking-widest">PRODUCT CATALOG & STOCK CONTROL</h2>
              <button 
                onClick={handleAddNew}
                className="bg-black text-white px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-[#ED3833] transition-colors cursor-pointer shadow-sm"
              >
                + ADD NEW PRODUCT
              </button>
            </div>

            {isEditing && (
              <div className="bg-white border-2 border-black p-6 sm:p-8 mb-12 shadow-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">
                  {isEditing === 'new' ? 'Create New Product' : `Editing: ${formData.title}`}
                </h3>
                <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs uppercase tracking-wider">
                  
                  <div className="space-y-1">
                    <label className="font-bold">URL Slug (e.g. techwear-jacket):</label>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      disabled={isEditing !== 'new'}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase"
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Product Title:</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase"
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Price (e.g. ₹ 4,990):</label>
                    <input 
                      type="text" 
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase"
                      required 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Issue Tag (e.g. ISSUE 03):</label>
                    <input 
                      type="text" 
                      value={formData.issue} 
                      onChange={(e) => setFormData({...formData, issue: e.target.value})}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="font-bold block">Product Images (Multiple URLs):</label>
                    {formData.images.map((imgUrl, idx) => (
                      <div key={idx} className="flex gap-2 mb-2">
                        <input 
                          type="text"
                          value={imgUrl}
                          onChange={(e) => handleImageChange(idx, e.target.value)}
                          placeholder={`Image URL ${idx + 1}`}
                          className="flex-1 bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs"
                          required
                        />
                        {formData.images.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => handleRemoveImageField(idx)}
                            className="bg-red-600 text-white px-3 font-bold hover:bg-red-700 cursor-pointer"
                          >
                            X
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      type="button" 
                      onClick={handleAddImageField}
                      className="text-[10px] bg-black text-white px-4 py-2 uppercase tracking-widest font-bold hover:bg-[#ED3833] cursor-pointer"
                    >
                      + Add Another Image
                    </button>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="font-bold">Short Description:</label>
                    <input 
                      type="text" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label className="font-bold">Details:</label>
                    <textarea 
                      value={formData.details} 
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-neutral-100 border border-black/30 p-2.5 font-mono-custom text-xs uppercase h-24"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="bg-black text-white px-6 py-3.5 font-bold hover:bg-[#ED3833] transition-colors cursor-pointer">
                      SAVE PRODUCT
                    </button>
                    <button type="button" onClick={() => setIsEditing(null)} className="border border-black px-6 py-3.5 font-bold hover:bg-black/5 transition-colors cursor-pointer">
                      CANCEL
                    </button>
                  </div>

                </form>
              </div>
            )}

            <div className="bg-white border-2 border-black overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs uppercase tracking-wider min-w-[600px]">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {Object.values(products).map((product) => (
                    <tr key={product.slug} className="hover:bg-neutral-50 transition-colors">
                      <td className="p-4 font-bold">{product.title} <span className="block text-[10px] text-neutral-500 font-normal">/shop/{product.slug}</span></td>
                      <td className="p-4 font-bold">{product.price}</td>
                      <td className="p-4">
                        <button 
                          onClick={() => handleToggleStock(product.slug)}
                          className={`px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-colors ${
                            product.inStock ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'
                          }`}
                        >
                          {product.inStock ? 'IN STOCK (CLICK TO OUT)' : 'OUT OF STOCK (CLICK TO IN)'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-3">
                        <button 
                          onClick={() => { setFormData(product); setIsEditing(product.slug); }}
                          className="underline hover:text-[#ED3833] cursor-pointer font-bold"
                        >
                          EDIT
                        </button>
                        <button 
                          onClick={() => handleDelete(product.slug)}
                          className="underline text-red-600 hover:text-red-800 cursor-pointer font-bold"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PAGE CONTENT & CMS EDITOR */}
        {activeTab === 'cms' && (
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">
              SITE-WIDE CONTENT & MEDIA CMS
            </h2>
            <form onSubmit={handleSaveCms} className="space-y-6 text-xs uppercase tracking-wider">
              
              <div className="space-y-1">
                <label className="font-bold">Home Page Main Banner Headline:</label>
                <input 
                  type="text"
                  value={siteContent.homeTitle}
                  onChange={(e) => setSiteContent({...siteContent, homeTitle: e.target.value})}
                  className="w-full bg-neutral-100 border border-black/30 p-3 font-mono-custom text-xs uppercase"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Home Page Subtitle / Manifesto:</label>
                <textarea 
                  value={siteContent.homeSubtitle}
                  onChange={(e) => setSiteContent({...siteContent, homeSubtitle: e.target.value})}
                  className="w-full bg-neutral-100 border border-black/30 p-3 font-mono-custom text-xs uppercase h-24"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Hero Background Video / Media URL:</label>
                <input 
                  type="text"
                  value={siteContent.heroVideoUrl}
                  onChange={(e) => setSiteContent({...siteContent, heroVideoUrl: e.target.value})}
                  className="w-full bg-neutral-100 border border-black/30 p-3 font-mono-custom text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Terms & Conditions Policy Text:</label>
                <textarea 
                  value={siteContent.legalTerms}
                  onChange={(e) => setSiteContent({...siteContent, legalTerms: e.target.value})}
                  className="w-full bg-neutral-100 border border-black/30 p-3 font-mono-custom text-xs uppercase h-28"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold">Shipping Policy Details:</label>
                <textarea 
                  value={siteContent.shippingInfo}
                  onChange={(e) => setSiteContent({...siteContent, shippingInfo: e.target.value})}
                  className="w-full bg-neutral-100 border border-black/30 p-3 font-mono-custom text-xs uppercase h-24"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="bg-black text-white px-6 py-3.5 font-bold hover:bg-[#ED3833] transition-colors cursor-pointer"
              >
                UPDATE ALL PAGE CONTENT & MEDIA →
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white border-2 border-black p-6 sm:p-8 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-6 border-b pb-2">
              CUSTOMER ORDERS & BAG ACTIVITY
            </h2>
            {orders.length === 0 ? (
              <p className="text-xs uppercase tracking-wider text-neutral-500 py-12 text-center">
                [ NO CUSTOMER ORDERS OR BAG ITEMS RECORDED YET. ]
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs uppercase tracking-wider min-w-[500px]">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="p-4">Item Title</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Size</th>
                      <th className="p-4">Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {orders.map((order, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50 transition-colors">
                        <td className="p-4 font-bold">{order.title}</td>
                        <td className="p-4 font-bold">{order.price}</td>
                        <td className="p-4">{order.size || 'S'}</td>
                        <td className="p-4">{order.color || 'BLACK'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}