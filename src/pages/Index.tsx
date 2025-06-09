
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductHighlights from '../components/ProductHighlights';
import MarketingSlider from '../components/MarketingSlider';
import About from '../components/About';
import LocationsMap from '../components/LocationsMap';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProductHighlights />
        <MarketingSlider />
        <About />
        <LocationsMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
