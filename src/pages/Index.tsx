
import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import Hero from '../components/Hero';
import EnhancedFeaturedProducts from '../components/EnhancedFeaturedProducts';
import EditableProductHighlights from '../components/EditableProductHighlights';
import MarketingSlider from '../components/MarketingSlider';
import EditableAbout from '../components/EditableAbout';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import LocationsMap from '../components/LocationsMap';
import ContactSection from '../components/ContactSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DynamicHeader />
      <main>
        <Hero />
        <EnhancedFeaturedProducts />
        <EditableProductHighlights />
        <MarketingSlider />
        <EditableAbout />
        <Testimonials />
        <FAQ />
        <Newsletter />
        <LocationsMap />
        <ContactSection />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
