import { Button } from "@/components/ui/button";
import { Home, Wallet } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo from "./Logo";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="default" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Hush Assets</span>
              <span className="text-xs text-muted-foreground leading-tight">Encrypted Portfolio Management</span>
            </div>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            
            <Link to="/portfolio">
              <Button 
                variant={location.pathname === "/portfolio" ? "default" : "ghost"} 
                size="sm"
                className="flex items-center gap-2"
              >
                <Wallet className="w-4 h-4" />
                Portfolio
              </Button>
            </Link>
            
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;