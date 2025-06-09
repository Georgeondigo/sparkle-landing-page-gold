
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import OrderNowButton from './OrderNowButton';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Premium Multi-Surface Cloth",
      description: "Perfect for glass, electronics, and delicate surfaces. Ultra-soft microfiber.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400",
      rating: 4.9,
      price: "₹299"
    },
    {
      id: 2,
      name: "Kitchen Pro Cleaning Set",
      description: "Heavy-duty microfiber for kitchen counters, appliances, and tough stains.",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400",
      rating: 4.8,
      price: "₹499"
    },
    {
      id: 3,
      name: "Car Care Collection",
      description: "Specially designed for automotive surfaces. Scratch-free and lint-free.",
      image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=400",
      rating: 4.9,
      price: "₹699"
    }
  ];

  return (
    <section id="featured-products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our bestselling microfiber cloths, trusted by thousands of customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
          ))}
        </div>

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

export default FeaturedProducts;
