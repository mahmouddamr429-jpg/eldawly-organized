'use client';

import Navbar from '../navbar/Navbar';
import { Footer, HeroSection } from '../shared/ui/index';
import StorySection from './StorySection';
import FeaturesSection from './FeaturesSection';
import StatsSection from './StatsSection';
import CTASection from './CTASection';

export default function AboutPage() {
  return (
    <div className="page-enter min-h-screen flex flex-col" style={{ direction: 'rtl' }}>
      <Navbar />
      <HeroSection title={<>من قلب الفيوم <span className="gradient-text">لقلوب الناس</span></>} subtitle="محل حلويات مصري أصيل في قلب مسله، الفيوم — بنقدم أشهى الحلويات المصنوعة يدوياً" />
      <StorySection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
