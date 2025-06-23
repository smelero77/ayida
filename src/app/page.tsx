"use client"

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import KPIStats from '../components/KPIStats';
import DynamicMap from '../components/DynamicMap';
import Reviews from '../components/Reviews';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <HeroSection />
        <KPIStats />
        <DynamicMap />
        <Reviews />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
