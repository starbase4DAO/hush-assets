import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import Logo from "./Logo";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(197,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(197,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-background/10 rounded-3xl shadow-glow backdrop-blur-sm border border-primary/20">
            <Logo size="large" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-primary">Track Investments</span> <br />
          <span className="text-foreground">Privately</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Secure your DeFi portfolio with end-to-end encryption. Monitor your assets without exposing sensitive data to third parties.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="gradient-primary text-primary-foreground hover:shadow-glow transition-smooth px-8 py-4 text-lg font-semibold">
            <Lock className="w-5 h-5 mr-2" />
            Connect Wallet
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-primary/30 text-foreground hover:bg-primary/10 transition-smooth px-8 py-4 text-lg"
            onClick={() => window.location.href = '/portfolio'}
          >
            <Eye className="w-5 h-5 mr-2" />
            View Portfolio
          </Button>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="gradient-card p-6 rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-smooth">
            <Lock className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-sm text-muted-foreground">Your portfolio data is encrypted locally before transmission</p>
          </div>
          
          <div className="gradient-card p-6 rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-smooth">
            <EyeOff className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Zero Knowledge</h3>
            <p className="text-sm text-muted-foreground">We never see your private keys or transaction details</p>
          </div>
          
          <div className="gradient-card p-6 rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-smooth">
            <Shield className="w-8 h-8 text-primary mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">Track without compromising your financial privacy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;