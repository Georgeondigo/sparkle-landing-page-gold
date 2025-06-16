
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MapPin, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone?: string;
  store_type: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

interface InteractiveMapProps {
  locations: StoreLocation[];
  apiKey?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ locations, apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [userApiKey, setUserApiKey] = useState(apiKey || '');
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);

  const loadMap = async (key: string) => {
    if (!key.trim()) {
      toast.error('Please enter a valid Google Maps API key');
      return;
    }

    setIsLoading(true);
    
    try {
      const loader = new Loader({
        apiKey: key,
        version: 'weekly',
        libraries: ['places', 'marker']
      });

      await loader.load();
      
      if (!mapRef.current) return;

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Create map centered on India (or first location if available)
      const defaultCenter = locations.length > 0 && locations[0].latitude && locations[0].longitude
        ? { lat: locations[0].latitude, lng: locations[0].longitude }
        : { lat: 20.5937, lng: 78.9629 }; // Center of India

      const map = new google.maps.Map(mapRef.current, {
        zoom: locations.length > 1 ? 6 : 12,
        center: defaultCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          }
        ]
      });

      mapInstanceRef.current = map;

      // Add markers for each location
      const bounds = new google.maps.LatLngBounds();
      let hasValidCoordinates = false;

      locations.forEach((location) => {
        if (location.latitude && location.longitude) {
          hasValidCoordinates = true;
          
          const marker = new google.maps.Marker({
            position: { lat: location.latitude, lng: location.longitude },
            map: map,
            title: location.name,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="#8B5CF6" stroke="white" stroke-width="2"/>
                  <path d="M16 12v4l3 2" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              `)}`,
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 16)
            }
          });

          // Create info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="max-width: 250px; padding: 10px;">
                <h3 style="margin: 0 0 8px 0; color: #8B5CF6; font-size: 16px; font-weight: 600;">${location.name}</h3>
                <p style="margin: 0 0 6px 0; color: #6B7280; font-size: 14px;">${location.address}</p>
                ${location.phone ? `<p style="margin: 0 0 6px 0; color: #6B7280; font-size: 14px;">📞 ${location.phone}</p>` : ''}
                <span style="background: #F3F4F6; padding: 4px 8px; border-radius: 12px; font-size: 12px; color: #374151;">${location.store_type}</span>
              </div>
            `
          });

          marker.addListener('click', () => {
            // Close all other info windows
            markersRef.current.forEach(m => {
              const infoWindow = (m as any).infoWindow;
              if (infoWindow) infoWindow.close();
            });
            
            infoWindow.open(map, marker);
          });

          (marker as any).infoWindow = infoWindow;
          markersRef.current.push(marker);
          bounds.extend({ lat: location.latitude, lng: location.longitude });
        }
      });

      // Fit map to bounds if we have multiple locations
      if (hasValidCoordinates && locations.length > 1) {
        map.fitBounds(bounds);
        const padding = { top: 50, right: 50, bottom: 50, left: 50 };
        map.fitBounds(bounds, padding);
      }

      setMapLoaded(true);
      setShowApiKeyInput(false);
      toast.success('Google Maps loaded successfully!');

    } catch (error) {
      console.error('Error loading Google Maps:', error);
      toast.error('Failed to load Google Maps. Please check your API key and ensure it has the necessary permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMap = () => {
    if (userApiKey.trim()) {
      loadMap(userApiKey);
    }
  };

  // Auto-load map if API key is provided
  useEffect(() => {
    if (apiKey && mapRef.current) {
      loadMap(apiKey);
    }
  }, [apiKey]);

  if (showApiKeyInput || !mapLoaded) {
    return (
      <Card className="w-full h-96">
        <CardContent className="flex items-center justify-center h-full p-6">
          <div className="text-center max-w-md">
            <MapPin className="text-secondary mx-auto mb-4" size={48} />
            <h3 className="text-xl font-semibold text-primary mb-2">
              Interactive Google Maps
            </h3>
            
            {!apiKey && (
              <>
                <p className="text-muted-foreground mb-6">
                  Enter your Google Maps API key to enable the interactive map with store locations
                </p>
                
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter Google Maps API Key"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    className="w-full"
                  />
                  
                  <Button 
                    onClick={handleLoadMap}
                    disabled={isLoading || !userApiKey.trim()}
                    className="w-full"
                  >
                    {isLoading ? 'Loading Map...' : 'Load Interactive Map'}
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg text-left">
                  <div className="flex items-start">
                    <AlertCircle className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium mb-1">API Key Requirements:</p>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Enable Maps JavaScript API</li>
                        <li>Enable Places API (optional)</li>
                        <li>Add your domain to restrictions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {apiKey && isLoading && (
              <p className="text-muted-foreground">Loading interactive map...</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default InteractiveMap;
