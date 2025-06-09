
import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after 3 seconds
      setTimeout(() => setShowTooltip(true), 3000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in Tiffany Sparkles microfiber cloths. Could you please help me?");
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
    setShowTooltip(false);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-20 right-0 bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs animate-fade-in">
          <button 
            onClick={closeTooltip}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
          <p className="text-sm text-foreground mb-2 pr-4">
            👋 Need help choosing the right microfiber cloth?
          </p>
          <p className="text-xs text-muted-foreground">
            Chat with us on WhatsApp for instant assistance!
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <Button
        onClick={handleWhatsAppClick}
        className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        size="icon"
      >
        <MessageCircle size={28} />
      </Button>
    </div>
  );
};

export default WhatsAppFloat;
