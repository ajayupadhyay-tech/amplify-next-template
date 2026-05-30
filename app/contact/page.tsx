'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomEnquiryForm from '@/components/CustomEnquiryForm';
import { Phone, Mail, MapPin, Compass } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-off-white flex flex-col justify-between">
      <Navbar />

      <section className="py-20 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="GET IN TOUCH"
            title={<>We're Here to Help <span className="italic-orange">You Plan</span></>}
            subtitle="Have questions about packages, customizations, or bookings? Our travel specialists are just a message away."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 text-left">
            {/* Contact Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-xl shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-navy text-lg mb-1">Call Us</h4>
                <p className="text-sm text-gray-500 font-semibold mb-2">Speak to a curator right now</p>
                <a href="tel:+919876543210" className="text-primary font-bold hover:underline">+91 98765 43210</a>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-xl shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-navy text-lg mb-1">Email Us</h4>
                <p className="text-sm text-gray-500 font-semibold mb-2">We reply within 12 hours</p>
                <a href="mailto:curators@incredibleindia.com" className="text-primary font-bold hover:underline">curators@incredibleindia.com</a>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="bg-primary/10 border border-primary/20 text-primary p-3 rounded-xl shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-navy text-lg mb-1">Visit Office</h4>
                <p className="text-sm text-gray-500 font-semibold mb-2">Connaught Place, New Delhi</p>
                <span className="text-navy font-bold text-sm leading-relaxed block">12, Parliament Street, CP, 110001</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
            <CustomEnquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
