
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Sparkles, Users, TrendingUp } from 'lucide-react';
import SocialMedia from './SocialMedia';

const SocialCallToAction = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <Card className="border-2 border-secondary/30 shadow-2xl bg-gradient-to-br from-background/95 to-muted/50 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <CardContent className="p-12 text-center">
              <div className="mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-full mb-6 animate-pulse">
                  <Sparkles className="text-secondary animate-sparkle" size={40} />
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                  Join Our <span className="text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text">Clean Club</span>
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light max-w-3xl mx-auto leading-relaxed">
                  Follow us on our socials for more tips, tricks, and that satisfying shine content!
                </p>
              </div>

              {/* Enhanced Warning Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-3 border-amber-300/60 rounded-2xl p-8 mb-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mr-4 animate-pulse">
                    <AlertTriangle className="text-amber-600" size={28} />
                  </div>
                  <span className="font-bold text-2xl text-amber-800">Warning!</span>
                </div>
                <p className="text-amber-800 font-semibold text-lg leading-relaxed">
                  Joining our socials may cause new and excessive admiration of shiny surfaces! 
                  <span className="text-2xl ml-2 animate-sparkle inline-block">✨</span>
                </p>
              </div>

              {/* Enhanced Social Media Section */}
              <div className="mb-12">
                <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-3xl p-8 shadow-inner">
                  <h3 className="text-xl font-semibold text-primary mb-6">Connect With Us</h3>
                  <div className="flex justify-center mb-6">
                    <SocialMedia />
                  </div>
                </div>
              </div>

              {/* Enhanced Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-blue-900 mb-2">Exclusive Tips</h4>
                  <p className="text-blue-800 text-sm text-center">Get professional cleaning secrets</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-green-900 mb-2">Before/After</h4>
                  <p className="text-green-800 text-sm text-center">See amazing transformation results</p>
                </div>
                
                <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="text-purple-600" size={24} />
                  </div>
                  <h4 className="font-semibold text-purple-900 mb-2">Community</h4>
                  <p className="text-purple-800 text-sm text-center">Join the shine enthusiasts</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground text-lg font-medium">
                  Ready to join thousands of shine enthusiasts? 🌟
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialCallToAction;
