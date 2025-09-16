import Navigation from "@/components/Navigation";
import PortfolioDashboard from "@/components/PortfolioDashboard";
import WalletConnect from "@/components/WalletConnect";
import { useAccount } from 'wagmi';

const Portfolio = () => {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        {isConnected ? (
          <PortfolioDashboard />
        ) : (
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-2xl mx-auto">
              <WalletConnect />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;