'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'GENERAL INQUIRY',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const subjectOptions = ["GENERAL INQUIRY", "COLLABORATION", "ORDERS & SUPPORT", "PRESS"];

  // Security Helper: Sanitize string inputs against injection
  const sanitizeInput = (str: string) => {
    return str.replace(/[<>]/g, '').trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = sanitizeInput(formData.fullName);
    const cleanEmail = sanitizeInput(formData.email);
    const cleanMessage = sanitizeInput(formData.message);
    const cleanPhone = sanitizeInput(formData.phone);

    // Validation Layer (PDF Rule 01: Client & Server-side boundaries)
    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErrorMessage('[ PLEASE FILL IN ALL REQUIRED FIELDS CORRECTLY. ]');
      return;
    }

    // Email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setErrorMessage('[ PLEASE ENTER A VALID EMAIL ADDRESS. ]');
      return;
    }

    if (cleanMessage.length > 1000) {
      setErrorMessage('[ MESSAGE IS TOO LONG (MAX 1000 CHARACTERS). ]');
      return;
    }

    // Direct mailto trigger using sanitized customer & owner details
    const ownerEmail = "urbanoutfits.fashion@gmail.com";
    const mailSubject = encodeURIComponent(`[URBN CONTACT] ${formData.subject} - from ${cleanName}`);
    const mailBody = encodeURIComponent(`Sender Name: ${cleanName}\nSender Email: ${cleanEmail}\nPhone: ${cleanPhone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${cleanMessage}`);
    
    window.location.href = `mailto:${ownerEmail}?subject=${mailSubject}&body=${mailBody}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ fullName: '', email: '', subject: 'GENERAL INQUIRY', phone: '', message: '' });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#FFF9F7] text-black pt-28 pb-16 px-6 md:px-12 select-none overflow-x-hidden relative">
      
      {/* Background Grunge / Textured Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0 bg-repeat"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Form & Headings */}
        <div className="lg:col-span-7 flex flex-col space-y-10">
          
          <div>
            <div className="font-mono-custom text-xs tracking-widest text-[#ED3833] uppercase mb-3 flex items-center gap-3">
              <span>[ LET'S TALK ]</span>
            </div>

            <h1 className="font-thunder text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-4 break-words">
              CONTACT US.
            </h1>
            <div className="w-24 h-1.5 bg-[#ED3833] mb-4"></div>
            <p className="font-mono-custom text-xs uppercase tracking-[0.15em] text-neutral-800 leading-relaxed max-w-lg font-bold">
              IDEAS. COLLABORATIONS. ORDERS.<br />
              OR JUST A HELLO — WE'RE LISTENING.
            </p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
            
            {errorMessage && (
              <div className="font-mono-custom text-xs text-[#ED3833] uppercase tracking-widest bg-red-50 p-3 border border-red-200">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">[ FULL NAME ]</label>
                <input 
                  type="text" 
                  required
                  maxLength={50}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-transparent border-b border-black/40 py-2 font-mono-custom text-xs focus:outline-none focus:border-black transition-colors uppercase"
                  placeholder="AARAV SHARMA"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">[ EMAIL ]</label>
                <input 
                  type="email" 
                  required
                  maxLength={100}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-transparent border-b border-black/40 py-2 font-mono-custom text-xs focus:outline-none focus:border-black transition-colors uppercase"
                  placeholder="NAME@EXAMPLE.COM"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Custom Subject Dropdown */}
              <div className="space-y-1 relative">
                <label className="block font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">[ SELECT SUBJECT ]</label>
                <button
                  type="button"
                  onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                  className="w-full bg-transparent border-b border-black/40 py-2 font-mono-custom text-xs flex justify-between items-center text-left uppercase focus:outline-none cursor-pointer"
                >
                  <span className="truncate">{formData.subject}</span>
                  <span className="text-[#ED3833] font-bold text-sm">▾</span>
                </button>

                {isSubjectOpen && (
                  <div className="absolute top-full left-0 w-full bg-[#FFF9F7] border border-black/20 shadow-xl z-50 py-1 flex flex-col font-mono-custom text-xs">
                    {subjectOptions.map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setFormData({...formData, subject: opt});
                          setIsSubjectOpen(false);
                        }}
                        className={`px-3 py-2 text-left uppercase transition-colors truncate ${
                          formData.subject === opt ? 'bg-[#ED3833] text-white font-bold' : 'hover:bg-black hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="block font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">[ PHONE (OPTIONAL) ]</label>
                <input 
                  type="tel" 
                  maxLength={15}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-transparent border-b border-black/40 py-2 font-mono-custom text-xs focus:outline-none focus:border-black transition-colors uppercase"
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-mono-custom text-[10px] uppercase tracking-widest text-neutral-600">[ MESSAGE ]</label>
              <textarea 
                rows={4}
                required
                maxLength={1000}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent border-b border-black/40 py-2 font-mono-custom text-xs focus:outline-none focus:border-black transition-colors resize-none uppercase"
                placeholder="TELL US WHAT'S ON YOUR MIND..."
              />
            </div>

            <button 
              type="submit" 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group inline-flex items-center justify-between w-56 px-6 py-3.5 bg-black text-white font-mono-custom text-xs uppercase tracking-widest hover:bg-[#ED3833] transition-all cursor-pointer shadow-md"
            >
              <span>{isHovered ? '[ SEND MESSAGE → ]' : 'SEND MESSAGE'}</span>
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
            </button>

            {submitted && (
              <div className="font-mono-custom text-xs text-[#ED3833] uppercase tracking-widest animate-pulse">
                [ MESSAGE TRANSMITTED. OPENING MAIL CLIENT... ]
              </div>
            )}

          </form>

          {/* Contact Details Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-black/15 font-mono-custom text-xs">
            
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">[ EMAIL ]</span>
              <a href="mailto:urbanoutfits.fashion@gmail.com" className="font-bold text-black hover:text-[#ED3833] transition-colors truncate block">
                urbanoutfits.fashion@gmail.com
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">[ INSTAGRAM ]</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-bold text-black hover:text-[#ED3833] transition-colors block">
                @urbanoutfits_official
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">[ LOCATION ]</span>
              <span className="font-bold text-black block">New Delhi, India</span>
            </div>

          </div>

          <div className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-neutral-500 pt-2">
            DIFFERENT PEOPLE. SAME URBN.
          </div>

        </div>

        {/* Right Column */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-end items-stretch h-full">
          <img 
            src="/contact-hero.png" 
            alt="Contact Hero Cutout" 
            className="w-full max-w-none lg:w-[130%] h-auto object-cover object-right drop-shadow-2xl scale-125 transform translate-x-10 -translate-y-10"
          />
        </div>

      </div>

      <div className="block sm:hidden w-full h-44 pointer-events-none" aria-hidden="true" />

    </main>
  );
}