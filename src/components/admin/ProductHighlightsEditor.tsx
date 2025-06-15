
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Plus, Save, Trash2, MoveUp, MoveDown, X } from 'lucide-react';

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

const ProductHighlightsEditor = () => {
  const [content, setContent] = useState<HighlightsContent>({
    title: 'Why Choose Tiffany Sparkles?',
    description: 'Discover the difference that premium microfiber technology makes in your daily cleaning routine.',
    items: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHighlightsContent();
  }, []);

  const fetchHighlightsContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_sections')
        .select('content')
        .eq('section_name', 'product_highlights')
        .maybeSingle();

      if (error) throw error;

      if (data?.content) {
        setContent(data.content as unknown as HighlightsContent);
      }
    } catch (error) {
      console.error('Error fetching highlights content:', error);
      toast.error('Failed to load highlights content');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (itemIndex: number, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `highlight-${itemIndex}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('section-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('section-images')
        .getPublicUrl(fileName);

      const updatedItems = [...content.items];
      if (!updatedItems[itemIndex].images) {
        updatedItems[itemIndex].images = [];
      }
      updatedItems[itemIndex].images.push(publicUrl);
      setContent(prev => ({ ...prev, items: updatedItems }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const removeImage = async (itemIndex: number, imageIndex: number) => {
    try {
      const imageUrl = content.items[itemIndex].images[imageIndex];
      if (imageUrl) {
        const fileName = imageUrl.split('/').pop();
        if (fileName) {
          await supabase.storage.from('section-images').remove([fileName]);
        }
      }

      const updatedItems = [...content.items];
      updatedItems[itemIndex].images.splice(imageIndex, 1);
      setContent(prev => ({ ...prev, items: updatedItems }));
      toast.success('Image removed successfully');
    } catch (error) {
      console.error('Error removing image:', error);
      toast.error('Failed to remove image');
    }
  };

  const addItem = () => {
    const newItem: HighlightItem = {
      title: '',
      description: '',
      images: [],
      type: 'feature'
    };
    setContent(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setContent(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: keyof HighlightItem, value: any) => {
    const updatedItems = [...content.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setContent(prev => ({ ...prev, items: updatedItems }));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= content.items.length) return;

    const updatedItems = [...content.items];
    [updatedItems[index], updatedItems[newIndex]] = [updatedItems[newIndex], updatedItems[index]];
    setContent(prev => ({ ...prev, items: updatedItems }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from('content_sections')
        .select('id')
        .eq('section_name', 'product_highlights')
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('content_sections')
          .update({
            content: content as any,
            updated_at: new Date().toISOString()
          })
          .eq('section_name', 'product_highlights');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('content_sections')
          .insert({
            section_name: 'product_highlights',
            content: content as any
          });

        if (error) throw error;
      }

      toast.success('Product highlights updated successfully');
    } catch (error) {
      console.error('Error saving highlights:', error);
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
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Section Title</label>
          <Input
            value={content.title}
            onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Why Choose Tiffany Sparkles?"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Section Description</label>
          <Input
            value={content.description}
            onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description for the highlights section"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Highlight Items</h3>
          <Button onClick={addItem} variant="outline">
            <Plus className="mr-2" size={16} />
            Add Item
          </Button>
        </div>

        {content.items.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Item {index + 1}</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => moveItem(index, 'up')}
                  variant="outline"
                  size="sm"
                  disabled={index === 0}
                >
                  <MoveUp size={16} />
                </Button>
                <Button
                  onClick={() => moveItem(index, 'down')}
                  variant="outline"
                  size="sm"
                  disabled={index === content.items.length - 1}
                >
                  <MoveDown size={16} />
                </Button>
                <Button
                  onClick={() => removeItem(index)}
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
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(index, 'title', e.target.value)}
                    placeholder="Feature title"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Image</label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Feature description"
                  rows={3}
                />
              </div>

              {item.images && item.images.length > 0 && (
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Images (auto-rotating)</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {item.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          src={image}
                          alt={`${item.title} ${imgIndex + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          onClick={() => removeImage(index, imgIndex)}
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
        ))}
      </div>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        <Save className="mr-2" size={16} />
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};

export default ProductHighlightsEditor;
