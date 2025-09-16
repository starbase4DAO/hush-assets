import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, TrendingUp, TrendingDown, Plus, Shield, Coins } from "lucide-react";
import { useHushAssets } from "@/hooks/useHushAssets";
import { useAccount } from 'wagmi';
import Logo from "./Logo";

const PortfolioDashboard = () => {
  const [isEncrypted, setIsEncrypted] = useState(true);
  const [showCreateAsset, setShowCreateAsset] = useState(false);
  const [showCreatePortfolio, setShowCreatePortfolio] = useState(false);
  const [assetForm, setAssetForm] = useState({
    name: '',
    symbol: '',
    description: '',
    initialValue: '',
    riskScore: '',
    liquidityScore: ''
  });
  const [portfolioForm, setPortfolioForm] = useState({
    name: '',
    description: '',
    initialValue: '',
    riskLevel: ''
  });

  const { createAsset, createPortfolio, isLoading, error } = useHushAssets();
  const { address } = useAccount();

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAsset(
        assetForm.name,
        assetForm.symbol,
        assetForm.description,
        assetForm.initialValue,
        assetForm.riskScore,
        assetForm.liquidityScore
      );
      setShowCreateAsset(false);
      setAssetForm({
        name: '',
        symbol: '',
        description: '',
        initialValue: '',
        riskScore: '',
        liquidityScore: ''
      });
    } catch (err) {
      console.error('Failed to create asset:', err);
    }
  };

  const handleCreatePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPortfolio(
        portfolioForm.name,
        portfolioForm.description,
        portfolioForm.initialValue,
        portfolioForm.riskLevel
      );
      setShowCreatePortfolio(false);
      setPortfolioForm({
        name: '',
        description: '',
        initialValue: '',
        riskLevel: ''
      });
    } catch (err) {
      console.error('Failed to create portfolio:', err);
    }
  };

  const portfolioData = {
    totalValue: "$125,432.89",
    encryptedValue: "••••••••••",
    change24h: "+$2,341.45",
    changePercent: "+1.87%",
    assets: [
      {
        symbol: "ETH",
        name: "Ethereum",
        balance: "45.23",
        encryptedBalance: "••.••",
        value: "$89,234.50",
        encryptedValue: "••••••••",
        change: "+5.2%",
        trend: "up"
      },
      {
        symbol: "BTC",
        name: "Bitcoin",
        balance: "0.89",
        encryptedBalance: "•.••",
        value: "$28,945.12",
        encryptedValue: "••••••••",
        change: "-2.1%",
        trend: "down"
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        balance: "7,253.27",
        encryptedBalance: "••••.••",
        value: "$7,253.27",
        encryptedValue: "••••••••",
        change: "0.0%",
        trend: "stable"
      }
    ]
  };

  return (
    <section className="min-h-screen gradient-hero py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Logo size="default" />
              Your Portfolio
            </h2>
            <p className="text-muted-foreground">Encrypted and secure portfolio tracking</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Button
              variant={isEncrypted ? "default" : "outline"}
              onClick={() => setIsEncrypted(!isEncrypted)}
              className="flex items-center gap-2"
            >
              {isEncrypted ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isEncrypted ? "Show Values" : "Hide Values"}
            </Button>
            
            <Dialog open={showCreateAsset} onOpenChange={setShowCreateAsset}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Asset
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Asset</DialogTitle>
                  <DialogDescription>
                    Create a new encrypted asset to add to your portfolio
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateAsset} className="space-y-4">
                  <div>
                    <Label htmlFor="assetName">Asset Name</Label>
                    <Input
                      id="assetName"
                      value={assetForm.name}
                      onChange={(e) => setAssetForm({...assetForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="assetSymbol">Symbol</Label>
                    <Input
                      id="assetSymbol"
                      value={assetForm.symbol}
                      onChange={(e) => setAssetForm({...assetForm, symbol: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="assetDescription">Description</Label>
                    <Input
                      id="assetDescription"
                      value={assetForm.description}
                      onChange={(e) => setAssetForm({...assetForm, description: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="initialValue">Initial Value</Label>
                    <Input
                      id="initialValue"
                      type="number"
                      value={assetForm.initialValue}
                      onChange={(e) => setAssetForm({...assetForm, initialValue: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="riskScore">Risk Score (1-10)</Label>
                    <Input
                      id="riskScore"
                      type="number"
                      min="1"
                      max="10"
                      value={assetForm.riskScore}
                      onChange={(e) => setAssetForm({...assetForm, riskScore: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="liquidityScore">Liquidity Score (1-10)</Label>
                    <Input
                      id="liquidityScore"
                      type="number"
                      min="1"
                      max="10"
                      value={assetForm.liquidityScore}
                      onChange={(e) => setAssetForm({...assetForm, liquidityScore: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create Asset"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={showCreatePortfolio} onOpenChange={setShowCreatePortfolio}>
              <DialogTrigger asChild>
                <Button className="gradient-primary text-primary-foreground hover:shadow-glow transition-smooth">
                  <Coins className="w-4 h-4 mr-2" />
                  Create Portfolio
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Portfolio</DialogTitle>
                  <DialogDescription>
                    Create a new encrypted portfolio to manage your assets
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreatePortfolio} className="space-y-4">
                  <div>
                    <Label htmlFor="portfolioName">Portfolio Name</Label>
                    <Input
                      id="portfolioName"
                      value={portfolioForm.name}
                      onChange={(e) => setPortfolioForm({...portfolioForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolioDescription">Description</Label>
                    <Input
                      id="portfolioDescription"
                      value={portfolioForm.description}
                      onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolioValue">Initial Value</Label>
                    <Input
                      id="portfolioValue"
                      type="number"
                      value={portfolioForm.initialValue}
                      onChange={(e) => setPortfolioForm({...portfolioForm, initialValue: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="riskLevel">Risk Level (1-10)</Label>
                    <Input
                      id="riskLevel"
                      type="number"
                      min="1"
                      max="10"
                      value={portfolioForm.riskLevel}
                      onChange={(e) => setPortfolioForm({...portfolioForm, riskLevel: e.target.value})}
                      required
                    />
                  </div>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Creating..." : "Create Portfolio"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Portfolio Overview */}
        <Card className="gradient-card border-border/50 shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              Total Portfolio Value
              {isEncrypted && <Shield className="w-5 h-5 text-primary" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="text-4xl font-bold mb-2 text-encrypted">
                  {isEncrypted ? portfolioData.encryptedValue : portfolioData.totalValue}
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-success font-semibold">
                    {isEncrypted ? "••••••••" : portfolioData.change24h}
                  </span>
                  <span className="text-success text-sm">
                    ({isEncrypted ? "••••%" : portfolioData.changePercent})
                  </span>
                  <span className="text-xs text-muted-foreground">24h</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  🔒 Encrypted
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.assets.map((asset, index) => (
            <Card key={index} className="gradient-card border-border/50 shadow-card hover:shadow-glow transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{asset.symbol}</CardTitle>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                  {isEncrypted && <Shield className="w-4 h-4 text-primary" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-xl font-semibold text-encrypted">
                      {isEncrypted ? asset.encryptedBalance : asset.balance} {asset.symbol}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Value</p>
                    <p className="text-lg font-semibold text-encrypted">
                      {isEncrypted ? asset.encryptedValue : asset.value}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">24h Change</span>
                    <div className="flex items-center gap-1">
                      {asset.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-success" />
                      ) : asset.trend === "down" ? (
                        <TrendingDown className="w-3 h-3 text-destructive" />
                      ) : (
                        <div className="w-3 h-3" />
                      )}
                      <span 
                        className={`text-sm font-medium ${
                          asset.trend === "up" 
                            ? "text-success" 
                            : asset.trend === "down" 
                            ? "text-destructive" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {isEncrypted ? "••%" : asset.change}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDashboard;