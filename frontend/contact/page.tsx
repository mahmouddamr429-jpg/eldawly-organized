'use client';

import Navbar from '../navbar/Navbar';
import { HeroSection, Footer } from '../shared/ui/index';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

export default function ContactPage() {
  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ direction: 'rtl' }}>
      <Navbar />
      <HeroSection title={<>عندك <span className="gradient-text">سؤال</span>؟</>} subtitle="تواصل معنا في أي وقت" />

      <section className="py-16 bg-[#fdf9f5] flex-1">
        <div className="max-w-[1000px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <ContactInfo />
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
