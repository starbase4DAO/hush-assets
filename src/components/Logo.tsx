import { Hexagon, Lock, Eye } from "lucide-react";

const Logo = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizes = {
    small: {
      container: "w-8 h-8",
      hexagon: "w-4 h-4",
      lock: "w-2 h-2",
      eye: "w-2 h-2"
    },
    default: {
      container: "w-10 h-10",
      hexagon: "w-6 h-6",
      lock: "w-3 h-3",
      eye: "w-3 h-3"
    },
    large: {
      container: "w-16 h-16",
      hexagon: "w-10 h-10",
      lock: "w-4 h-4",
      eye: "w-4 h-4"
    }
  };

  const currentSize = sizes[size];

  return (
    <div className={`relative ${currentSize.container} flex items-center justify-center`}>
      {/* Main Hexagon Background */}
      <div className={`${currentSize.container} gradient-primary rounded-lg flex items-center justify-center shadow-glow relative overflow-hidden`}>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4px_4px]" />
        
        {/* Main Hexagon Icon */}
        <Hexagon className={`${currentSize.hexagon} text-primary-foreground relative z-10`} />
        
        {/* Lock overlay - positioned in top right */}
        <div className="absolute -top-1 -right-1 bg-background rounded-full p-0.5 border border-primary/30">
          <Lock className={`${currentSize.lock} text-primary`} />
        </div>
        
        {/* Eye overlay - positioned in bottom left */}
        <div className="absolute -bottom-1 -left-1 bg-background rounded-full p-0.5 border border-primary/30">
          <Eye className={`${currentSize.eye} text-primary`} />
        </div>
      </div>
    </div>
  );
};

export default Logo;