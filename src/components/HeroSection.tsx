import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="w-3 h-3 mr-1" />
                New Collection Available
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                Shop the Future
                <span className="block primary-gradient bg-clip-text text-transparent">
                  Today
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Discover premium products with our PWA experience. 
                Shop offline, get instant notifications, and enjoy lightning-fast performance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="xl" variant="premium" className="group">
                Shop Now
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button size="xl" variant="outline" className="group">
                <Zap className="w-4 h-4 mr-2" />
                View Features
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Offline Access</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">Fast</div>
                <div className="text-sm text-muted-foreground">Loading</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">Secure</div>
                <div className="text-sm text-muted-foreground">Payments</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative animate-float">
              <img
                src={heroBanner}
                alt="Modern e-commerce experience"
                className="w-full h-auto rounded-2xl shadow-premium"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card rounded-lg shadow-elevated p-3 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-xs font-medium">Free Shipping</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-card rounded-lg shadow-elevated p-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-xs font-medium">PWA Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};