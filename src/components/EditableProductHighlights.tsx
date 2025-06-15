
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

interface HighlightItem {
  title: string;
  description: string;
  images: string[];
  type: string;
}

interface HighlightsContent {
  title: string;
  description: string;
  items: HighlightItem[];
}

const EditableProductHighlights = () => {
  const [content, setContent] = useState<HighlightsContent>({
    title: 'Why Choose Tiffany Sparkles?',
    description: 'Discover the difference that premium microfiber technology makes in your daily cleaning routine.',
    items: []
  });
  const [imageIndices, setImageIndices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchHighlightsContent();
    
    // Auto-rotate images every 3 seconds
    const interval = setInterval(() => {
      setImageIndices(prev => {
        const newIndices = { ...prev };
        content.items.forEach((item, index) => {
          if (item.images && item.images.length > 1) {
            newIndices[index] = ((prev[index] || 0) + 1) % item.images.length;
          }
        });
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [content.items]);

  const fetchHighlightsContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'product_highlights')
        .maybeSingle();

      if (!error && data?.content) {
        setContent(data.content as unknown as HighlightsContent);
      }
    } catch (error) {
      console.error('Error fetching highlights content:', error);
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {content.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {content.items.map((item, index) => {
            const currentImageIndex = imageIndices[index] || 0;
            const currentImage = item.images?.[currentImageIndex] || item.images?.[0];

            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {currentImage && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={currentImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  {item.images && item.images.length > 1 && (
                    <div className="flex justify-center mt-4 space-x-1">
                      {item.images.map((_, imgIndex) => (
                        <div
                          key={imgIndex}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            imgIndex === currentImageIndex ? 'bg-secondary' : 'bg-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditableProductHighlights;
