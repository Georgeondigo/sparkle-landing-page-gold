
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Sparkles } from 'lucide-react';
import SocialMedia from './SocialMedia';

const SocialCallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-secondary/10 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-secondary/20 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <Sparkles className="text-secondary mx-auto mb-4" size={48} />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-4">
                  Join Our Clean Club
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Follow us on our socials for more tips, tricks, and that satisfying shine content!
                </p>
              </div>

              {/* Warning Box */}
              <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="text-amber-600 mr-2" size={24} />
                  <span className="font-semibold text-amber-800">Warning!</span>
                </div>
                <p className="text-amber-700 font-medium">
                  Joining our socials may cause new and excessive admiration of shiny surfaces! 
                  <span className="text-lg ml-1">✨</span>
                </p>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center">
                <SocialMedia />
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                <p>Get exclusive cleaning tips • See amazing before/after results • Join the community</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialCallToAction;
