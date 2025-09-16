import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, User, Coins } from 'lucide-react';

const WalletConnect = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Wallet className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle>Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to access Hush Assets and manage your encrypted portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Wallet Connected
        </CardTitle>
        <CardDescription>
          Your wallet is connected and ready to use
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">Address:</div>
          <div className="text-xs font-mono bg-muted p-2 rounded break-all">
            {address}
          </div>
        </div>
        
        {balance && (
          <div className="space-y-2">
            <div className="text-sm font-medium flex items-center gap-2">
              <Coins className="h-4 w-4" />
              Balance:
            </div>
            <Badge variant="secondary" className="text-sm">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </Badge>
          </div>
        )}
        
        <div className="pt-2">
          <ConnectButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletConnect;
