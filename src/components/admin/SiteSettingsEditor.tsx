
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, Upload, Trash2 } from 'lucide-react';

interface LogoSetting {
  url: string;
  alt: string;
}

const SiteSettingsEditor = () => {
  const [logo, setLogo] = useState<LogoSetting>({ url: '', alt: 'Tiffany Sparkles Logo' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSiteSettings();
  }, []);

  const fetchSiteSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_value')
        .eq('setting_key', 'logo')
        .maybeSingle();

      if (!error && data?.setting_value) {
        const logoData = data.setting_value as unknown;
        if (logoData && typeof logoData === 'object' && 'url' in logoData && 'alt' in logoData) {
          setLogo(logoData as LogoSetting);
        }
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast.error('Failed to load site settings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `logo.${fileExt}`;

      // Delete old logo if exists
      if (logo.url) {
        const oldPath = logo.url.split('/').pop();
        if (oldPath && oldPath !== fileName) {
          await supabase.storage.from('site-assets').remove([oldPath]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('site-assets')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-assets')
        .getPublicUrl(fileName);

      setLogo(prev => ({ ...prev, url: publicUrl }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Error uploading logo:', error);
      toast.error('Failed to upload logo');
    }
  };

  const handleRemoveLogo = async () => {
    try {
      if (logo.url) {
        const path = logo.url.split('/').pop();
        if (path) {
          await supabase.storage.from('site-assets').remove([path]);
        }
      }
      setLogo(prev => ({ ...prev, url: '' }));
      toast.success('Logo removed successfully');
    } catch (error) {
      console.error('Error removing logo:', error);
      toast.error('Failed to remove logo');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          setting_key: 'logo',
          setting_value: logo as any,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast.success('Site settings updated successfully');
    } catch (error) {
      console.error('Error saving site settings:', error);
      toast.error('Failed to save changes: ' + (error as any).message);
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
          <CardTitle>Site Logo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Logo Alt Text</label>
            <Input
              value={logo.alt}
              onChange={(e) => setLogo(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="e.g., Tiffany Sparkles Logo"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Upload Logo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleLogoUpload(file);
              }}
            />
          </div>

          {logo.url && (
            <div className="space-y-2">
              <label className="text-sm font-medium block">Current Logo</label>
              <div className="flex items-center space-x-4">
                <img
                  src={logo.url}
                  alt={logo.alt}
                  className="h-16 w-auto object-contain border rounded"
                />
                <Button
                  onClick={handleRemoveLogo}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 size={16} className="mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        <Save className="mr-2" size={16} />
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default SiteSettingsEditor;
