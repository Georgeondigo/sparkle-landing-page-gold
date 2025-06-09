
import React, { useState } from 'react';
import { MapPin, Store, Phone, ExternalLink } from 'lucide-react';

const LocationsMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sample store locations (replace with actual data)
  const storeLocations = [
    {
      id: 1,
      name: "Premium Homeware Mumbai",
      address: "123 Shopping Mall, Bandra West, Mumbai 400050",
      phone: "+91 98765 43210",
      type: "Retail Partner"
    },
    {
      id: 2,
      name: "Quality Essentials Delhi",
      address: "456 Market Street, Connaught Place, New Delhi 110001",
      phone: "+91 98765 43211",
      type: "Authorized Dealer"
    },
    {
      id: 3,
      name: "Home Solutions Bangalore",
      address: "789 Commercial Complex, MG Road, Bangalore 560001",
      phone: "+91 98765 43212",
      type: "Retail Partner"
    }
  ];

  return (
    <section id="locations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Where to Find Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover Tiffany Sparkles products at these premium retail locations across the country
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Container */}
          <div className="order-2 lg:order-1">
            <div className="bg-background rounded-2xl shadow-lg p-6 h-96">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-muted/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                <div className="text-center z-10">
                  <MapPin className="text-secondary mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-primary mb-2">Interactive Map</h3>
                  <p className="text-muted-foreground mb-4">
                    Google Maps integration will be added here
                  </p>
                  <div className="text-sm text-muted-foreground bg-background/80 px-4 py-2 rounded-lg inline-block">
                    <strong>Setup Instructions:</strong><br />
                    Add your Google Maps API key to enable interactive map functionality
                  </div>
                </div>
                
                {/* Simulated map pins */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Store Locations List */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center">
              <Store className="text-secondary mr-3" size={28} />
              Our Retail Partners
            </h3>
            
            <div className="space-y-4">
              {storeLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-background rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-secondary/20"
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-semibold text-primary">{location.name}</h4>
                    <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      {location.type}
                    </span>
                  </div>
                  
                  <div className="flex items-start text-muted-foreground mb-3">
                    <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm">{location.address}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground">
                      <Phone size={16} className="mr-2" />
                      <span className="text-sm">{location.phone}</span>
                    </div>
                    <button className="text-secondary hover:text-secondary/80 transition-colors">
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact for Partnership */}
            <div className="mt-8 bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-primary-foreground">
              <h4 className="text-lg font-semibold mb-3">Interested in Partnership?</h4>
              <p className="text-sm opacity-90 mb-4">
                Join our network of premium retail partners and bring Tiffany Sparkles to your customers.
              </p>
              <button className="bg-background text-primary px-4 py-2 rounded-lg font-medium hover:bg-background/90 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-background rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-primary mb-4">Can't Find a Store Near You?</h3>
            <p className="text-muted-foreground mb-6">
              We're constantly expanding our retail network. Contact us to find the nearest authorized dealer 
              or to inquire about direct purchasing options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Find Nearest Store
              </button>
              <button className="border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsMap;
