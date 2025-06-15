
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OrderNowButton from './OrderNowButton';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  name: string;
  description: string;
  images: string[];
  rating: number;
  price: string;
}

interface ProductsContent {
  title: string;
  description: string;
  products: Product[];
}

const EnhancedFeaturedProducts = () => {
  const [content, setContent] = useState<ProductsContent>({
    title: 'Featured Products',
    description: 'Discover our bestselling microfiber cloths, trusted by thousands of customers',
    products: [
      {
        name: "Premium Multi-Surface Cloth",
        description: "Perfect for glass, electronics, and delicate surfaces. Ultra-soft microfiber.",
        images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400"],
        rating: 4.9,
        price: "₹299"
      },
      {
        name: "Kitchen Pro Cleaning Set",
        description: "Heavy-duty microfiber for kitchen counters, appliances, and tough stains.",
        images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400"],
        rating: 4.8,
        price: "₹499"
      },
      {
        name: "Car Care Collection",
        description: "Specially designed for automotive surfaces. Scratch-free and lint-free.",
        images: ["https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=400"],
        rating: 4.9,
        price: "₹699"
      }
    ]
  });
  const [imageIndices, setImageIndices] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    fetchProductsContent();
  }, []);

  const fetchProductsContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'featured_products')
        .maybeSingle();

      if (!error && data?.content) {
        setContent(data.content as unknown as ProductsContent);
      }
    } catch (error) {
      console.error('Error fetching products content:', error);
    }
  };

  const nextImage = (productIndex: number, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [productIndex]: ((prev[productIndex] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productIndex: number, totalImages: number) => {
    setImageIndices(prev => ({
      ...prev,
      [productIndex]: ((prev[productIndex] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const ProductCard = ({ product, index }: { product: Product; index: number }) => {
    const currentImageIndex = imageIndices[index] || 0;
    const hasMultipleImages = product.images && product.images.length > 1;

    return (
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden flex-shrink-0 w-80">
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.images?.[currentImageIndex] || product.images?.[0] || ''}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasMultipleImages && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={() => prevImage(index, product.images.length)}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white"
                onClick={() => nextImage(index, product.images.length)}
              >
                <ChevronRight size={16} />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {product.images.map((_, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`w-2 h-2 rounded-full ${
                      imgIndex === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <CardContent className="p-6">
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(product.rating) ? "text-secondary fill-current" : "text-muted-foreground"} 
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
          </div>
          
          <h3 className="text-xl font-semibold text-primary mb-2">{product.name}</h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-secondary">{product.price}</span>
            <OrderNowButton 
              size="sm"
              className="bg-primary hover:bg-primary/90"
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="featured-products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Horizontal scrolling grid for more than 3 products */}
        {content.products.length > 3 ? (
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-max">
              {content.products.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <OrderNowButton 
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          />
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturedProducts;
