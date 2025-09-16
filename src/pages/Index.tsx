import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import WalletConnect from "@/components/WalletConnect";
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      {!isConnected && (
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            <WalletConnect />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
