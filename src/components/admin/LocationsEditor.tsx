
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Plus, Save, Trash2, MapPin } from 'lucide-react';

interface StoreLocation {
  id?: string;
  name: string;
  address: string;
  phone?: string;
  store_type: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
}

const LocationsEditor = () => {
  const [locations, setLocations] = useState<StoreLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState<string>('');
  const [geocodingStates, setGeocodingStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    fetchLocations();
    fetchGoogleMapsApiKey();
  }, []);

  const fetchGoogleMapsApiKey = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'google_maps_api_key')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching Google Maps API key:', error);
        return;
      }

      if (data && data.setting_value) {
        setGoogleMapsApiKey(String(data.setting_value));
      }
    } catch (error) {
      console.error('Error fetching Google Maps API key:', error);
    }
  };

  const fetchLocations = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('store_locations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLocations(data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast.error('Failed to load store locations');
    } finally {
      setLoading(false);
    }
  };

  const addLocation = () => {
    const newLocation: StoreLocation = {
      name: '',
      address: '',
      phone: '',
      store_type: 'Retail Partner',
      latitude: undefined,
      longitude: undefined,
      is_active: true
    };
    setLocations(prev => [...prev, newLocation]);
  };

  const removeLocation = async (index: number) => {
    const location = locations[index];
    
    if (location.id) {
      try {
        const { error } = await (supabase as any)
          .from('store_locations')
          .delete()
          .eq('id', location.id);

        if (error) throw error;
        toast.success('Store location deleted successfully');
      } catch (error) {
        console.error('Error deleting location:', error);
        toast.error('Failed to delete location');
        return;
      }
    }

    setLocations(prev => prev.filter((_, i) => i !== index));
  };

  const updateLocation = (index: number, field: keyof StoreLocation, value: any) => {
    const updated = [...locations];
    updated[index] = { ...updated[index], [field]: value };
    setLocations(updated);
  };

  const geocodeAddress = async (index: number) => {
    const location = locations[index];
    if (!location.address) {
      toast.error('Please enter an address first');
      return;
    }

    if (!googleMapsApiKey) {
      toast.error('Google Maps API key not configured. Please configure it in the Maps settings.');
      return;
    }

    setGeocodingStates(prev => ({ ...prev, [index]: true }));

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location.address)}&key=${googleMapsApiKey}`
      );

      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }

      const data = await response.json();

      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const result = data.results[0];
        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;

        updateLocation(index, 'latitude', lat);
        updateLocation(index, 'longitude', lng);

        toast.success(`Coordinates found: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      } else if (data.status === 'ZERO_RESULTS') {
        toast.error('No coordinates found for this address. Please check the address and try again.');
      } else if (data.status === 'REQUEST_DENIED') {
        toast.error('Geocoding request denied. Please check your API key permissions.');
      } else {
        toast.error(`Geocoding failed: ${data.status}`);
      }
    } catch (error) {
      console.error('Error geocoding address:', error);
      toast.error('Failed to get coordinates. Please check your internet connection and try again.');
    } finally {
      setGeocodingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const location of locations) {
        if (location.id) {
          // Update existing
          const { error } = await (supabase as any)
            .from('store_locations')
            .update({
              name: location.name,
              address: location.address,
              phone: location.phone,
              store_type: location.store_type,
              latitude: location.latitude,
              longitude: location.longitude,
              is_active: location.is_active,
              updated_at: new Date().toISOString()
            })
            .eq('id', location.id);

          if (error) throw error;
        } else {
          // Insert new
          const { error } = await (supabase as any)
            .from('store_locations')
            .insert({
              name: location.name,
              address: location.address,
              phone: location.phone,
              store_type: location.store_type,
              latitude: location.latitude,
              longitude: location.longitude,
              is_active: location.is_active
            });

          if (error) throw error;
        }
      }

      toast.success('Store locations updated successfully');
      fetchLocations(); // Refresh to get IDs for new locations
    } catch (error) {
      console.error('Error saving locations:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Store Locations</h3>
        <Button onClick={addLocation} variant="outline">
          <Plus className="mr-2" size={16} />
          Add Store Location
        </Button>
      </div>

      {!googleMapsApiKey && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-sm">
            <strong>Note:</strong> Google Maps API key is not configured. The geocoding feature will not work until you configure it in the Maps settings tab.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {locations.map((location, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Store {index + 1}</CardTitle>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={location.is_active}
                  onCheckedChange={(checked) => updateLocation(index, 'is_active', checked)}
                />
                <span className="text-sm">Active</span>
                <Button
                  onClick={() => removeLocation(index)}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Name</label>
                  <Input
                    value={location.name}
                    onChange={(e) => updateLocation(index, 'name', e.target.value)}
                    placeholder="Store name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Type</label>
                  <Input
                    value={location.store_type}
                    onChange={(e) => updateLocation(index, 'store_type', e.target.value)}
                    placeholder="e.g., Retail Partner, Authorized Dealer"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Address</label>
                <Textarea
                  value={location.address}
                  onChange={(e) => updateLocation(index, 'address', e.target.value)}
                  placeholder="Full store address"
                  rows={2}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone (Optional)</label>
                  <Input
                    value={location.phone || ''}
                    onChange={(e) => updateLocation(index, 'phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Latitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={location.latitude || ''}
                    onChange={(e) => updateLocation(index, 'latitude', parseFloat(e.target.value) || undefined)}
                    placeholder="19.0596"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Longitude</label>
                  <Input
                    type="number"
                    step="any"
                    value={location.longitude || ''}
                    onChange={(e) => updateLocation(index, 'longitude', parseFloat(e.target.value) || undefined)}
                    placeholder="72.8295"
                  />
                </div>
              </div>

              <Button
                onClick={() => geocodeAddress(index)}
                variant="outline"
                size="sm"
                disabled={!googleMapsApiKey || !location.address || geocodingStates[index]}
              >
                <MapPin className="mr-2" size={16} />
                {geocodingStates[index] ? 'Getting Coordinates...' : 'Get Coordinates from Address'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        <Save className="mr-2" size={16} />
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default LocationsEditor;
