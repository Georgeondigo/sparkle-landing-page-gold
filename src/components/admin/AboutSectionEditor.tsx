
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';

interface Stat {
  number: string;
  label: string;
  icon: string;
}

interface AboutContent {
  title: string;
  description: string;
  content: string;
  images: string[];
  stats: Stat[];
}

const AboutSectionEditor = () => {
  const [content, setContent] = useState<AboutContent>({
    title: 'Our Story of Excellence',
    description: 'Tiffany Sparkles represents the pinnacle of microfiber innovation, brought to you by Dinesh Gupta Limited, a trusted name in quality manufacturing for over a decade.',
    content: 'Our journey began with a simple vision: to revolutionize the cleaning industry through superior microfiber technology. Today, we are proud to offer products that combine cutting-edge science with elegant design, making cleaning not just effective, but enjoyable.',
    images: [],
    stats: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'about_section')
        .maybeSingle();

      if (error) throw error;

      if (data?.content) {
        setContent(data.content as unknown as AboutContent);
      }
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast.error('Failed to load about content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `about-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('section-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('section-images')
        .getPublicUrl(fileName);

      setContent(prev => ({
        ...prev,
        images: [...prev.images, publicUrl]
      }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const removeImage = async (imageIndex: number) => {
    try {
      const imageUrl = content.images[imageIndex];
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('section-images').remove([fileName]);
        }
      }

      const updatedImages = [...content.images];
      updatedImages.splice(imageIndex, 1);
      setContent(prev => ({ ...prev, images: updatedImages }));
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    }
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const updatedStats = [...content.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: value };
    setContent(prev => ({ ...prev, stats: updatedStats }));
  };

  const addStat = () => {
    setContent(prev => ({
      ...prev,
      stats: [...prev.stats, { number: '', label: '', icon: 'Building2' }]
    }));
  };

  const removeStat = (index: number) => {
    setContent(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('content_sections')
        .select('id')
        .eq('section_name', 'about_section')
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('content_sections')
          .update({
            content: content as any,
            updated_at: new Date().toISOString()
          })
          .eq('section_name', 'about_section');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content_sections')
          .insert({
            section_name: 'about_section',
            content: content as any
          });

        if (error) throw error;
      }

      toast.success('About section updated successfully');
    } catch (error) {
      console.error('Error saving about content:', error);
      toast.error('Failed to save changes: ' + (error as any).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-8">Loading...</div>;
  }

  const iconOptions = ['Building2', 'Users', 'Award', 'Globe'];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Section Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Section Title</label>
            <Input
              value={content.title}
              onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Our Story of Excellence"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Main Description</label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description for the about section"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Detailed Content</label>
            <Textarea
              value={content.content}
              onChange={(e) => setContent(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Detailed content about the company"
              rows={4}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Upload Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </div>

          {content.images && content.images.length > 0 && (
            <div className="mt-4">
              <label className="text-sm font-medium mb-2 block">Section Images</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {content.images.map((image, imgIndex) => (
                  <div key={imgIndex} className="relative">
                    <img
                      src={image}
                      alt={`About section ${imgIndex + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      onClick={() => removeImage(imgIndex)}
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Statistics</CardTitle>
          <Button onClick={addStat} variant="outline" size="sm">
            Add Stat
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {content.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
              <div>
                <label className="text-sm font-medium mb-1 block">Number</label>
                <Input
                  value={stat.number}
                  onChange={(e) => updateStat(index, 'number', e.target.value)}
                  placeholder="e.g., 15+"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Label</label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, 'label', e.target.value)}
                  placeholder="e.g., Years in Business"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Icon</label>
                <select
                  value={stat.icon}
                  onChange={(e) => updateStat(index, 'icon', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => removeStat(index)}
                  variant="outline"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        <Save className="mr-2" size={16} />
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default AboutSectionEditor;
