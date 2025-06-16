
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { MapPin, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const MapSettingsEditor = () => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApiKey();
  }, []);

  const fetchApiKey = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'google_maps_api_key')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        // Ensure we convert to string, handling null/undefined cases
        setApiKey(data.setting_value ? String(data.setting_value) : '');
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid Google Maps API key');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'google_maps_api_key',
          setting_value: apiKey.trim(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      
      toast.success('Google Maps API key saved successfully');
    } catch (error) {
      console.error('Error saving API key:', error);
      toast.error('Failed to save API key');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2" size={20} />
            Google Maps Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Google Maps API Key
            </label>
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Google Maps API key"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              This API key will be stored securely in your Supabase database
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
              <li>Go to <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Google Cloud Console <ExternalLink size={12} className="ml-1" /></a></li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the following APIs:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Maps JavaScript API</li>
                  <li>Places API (optional, for enhanced features)</li>
                </ul>
              </li>
              <li>Create credentials (API Key)</li>
              <li>Restrict the API key to your domain</li>
              <li>Copy and paste the API key above</li>
            </ol>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-2">Important Security Notes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
              <li>Always restrict your API key to specific domains</li>
              <li>Enable only the APIs you actually need</li>
              <li>Monitor your API usage regularly</li>
              <li>Set up billing alerts to prevent unexpected charges</li>
            </ul>
          </div>

          <Button onClick={handleSave} disabled={saving || !apiKey.trim()} className="w-full">
            {saving ? 'Saving...' : 'Save API Key'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Interactive Map</span>
              <span className={`text-sm px-2 py-1 rounded ${apiKey ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {apiKey ? 'API Key Configured' : 'Awaiting API Key'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Store Locations</span>
              <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Location Markers</span>
              <span className={`text-sm px-2 py-1 rounded ${apiKey ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                {apiKey ? 'Ready' : 'Awaiting API Key'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapSettingsEditor;
