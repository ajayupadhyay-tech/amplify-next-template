'use client';

import React from 'react';
import { Compass, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-left">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Compass className="h-8 w-8 text-primary animate-spin-slow" />
              <span className="text-xl font-black tracking-wider bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">
                INCREDIBLE INDIA
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Handcrafting immersive travel experiences across India's most mystical regions, historical landmarks, and tranquil retreats.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-primary tracking-wide uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400" style={{ border: 'none', background: 'none', padding: 0 }}>
              <li style={{ padding: 0, background: 'none' }}><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/packages" className="hover:text-white transition-colors">Travel Packages</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/regions" className="hover:text-white transition-colors">Explore Regions</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/about" className="hover:text-white transition-colors">About Our Agency</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold text-primary tracking-wide uppercase">Support</h4>
            <ul className="flex flex-col gap-2.5 text-sm text-gray-400" style={{ border: 'none', background: 'none', padding: 0 }}>
              <li style={{ padding: 0, background: 'none' }}><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li style={{ padding: 0, background: 'none' }}><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-5 text-sm text-gray-400">
            <h4 className="text-base font-bold text-primary tracking-wide uppercase">Get in Touch</h4>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <span>curators@incredibleindia.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>12, Parliament Street, Connaught Place, New Delhi, 110001, India</span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-white/5 text-center text-xs text-gray-500 font-semibold flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Incredible India Travel Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
