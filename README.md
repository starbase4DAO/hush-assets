# Hush Assets - Private Portfolio Management

A revolutionary decentralized platform that uses Fully Homomorphic Encryption (FHE) to ensure complete privacy for your cryptocurrency portfolio. Built on Zama's cutting-edge FHEVM technology, Hush Assets keeps your financial data encrypted even during blockchain computations.

## ⚡ Core Capabilities

- **🔒 Zero-Knowledge Privacy**: All sensitive data encrypted using advanced FHE technology
- **🌐 Decentralized Infrastructure**: Powered by Ethereum Sepolia testnet smart contracts
- **💼 Multi-Wallet Support**: Seamless integration with Rainbow, MetaMask, and other Web3 wallets
- **📊 Encrypted Portfolio Management**: Create and manage portfolios with complete privacy
- **📈 Private Asset Tracking**: Monitor crypto assets without exposing financial data
- **⚡ Real-time Processing**: Live portfolio updates with encrypted data computation

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **RainbowKit** for wallet connection
- **Wagmi** for Ethereum interactions

### Blockchain
- **Solidity 0.8.24** for smart contracts
- **FHEVM** for homomorphic encryption
- **Hardhat** for development and deployment
- **Ethereum Sepolia** testnet

### Encryption
- **Zama FHEVM** for fully homomorphic encryption
- **Encrypted data types** (euint32, ebool)
- **Private computation** on encrypted data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Web3 wallet (MetaMask, Rainbow, etc.)
- Sepolia ETH for gas fees

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/starbase4DAO/hush-assets.git
   cd hush-assets
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Connecting Your Wallet

1. Click the "Connect Wallet" button in the navigation
2. Select your preferred wallet (MetaMask, Rainbow, etc.)
3. Approve the connection in your wallet
4. You're now connected and ready to use Hush Assets!

### Creating Assets

1. Navigate to the Portfolio page
2. Click "Create Asset"
3. Fill in the asset details:
   - Name and symbol
   - Description
   - Initial value
   - Risk score (1-10)
   - Liquidity score (1-10)
4. Submit the transaction
5. Your encrypted asset is now created on-chain!

### Managing Portfolios

1. Click "Create Portfolio"
2. Enter portfolio details:
   - Name and description
   - Initial value
   - Risk level (1-10)
3. Your encrypted portfolio is created
4. Add assets to your portfolio through transactions

## 🔧 Development

### Smart Contract Development

1. **Install Hardhat dependencies**
   ```bash
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/hardhat-plugin
   ```

2. **Compile contracts**
   ```bash
   npx hardhat compile
   ```

3. **Deploy to Sepolia**
   ```bash
   npx hardhat run scripts/deploy.ts --network sepolia
   ```

### Frontend Development

1. **Start development server**
   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

## 🛡️ Privacy & Security

- **🔐 Advanced FHE Encryption**: All sensitive data protected using Zama's FHEVM technology
- **🧮 Private Computation**: Mathematical operations performed on encrypted data
- **🚫 Zero Data Exposure**: Financial information never exists in plaintext on-chain
- **✅ Decentralized Verification**: Smart contracts handle all verification and validation
- **🔑 Wallet Security**: Private keys remain secure in your personal wallet

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables

2. **Environment Variables**
   Set the following in Vercel dashboard:
   ```
   VITE_CHAIN_ID=11155111
   VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
   VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
   VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
   VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Your app will be available at `https://your-app.vercel.app`

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   Upload the contents of the `dist` folder to your hosting provider

## 📊 Smart Contract Architecture

### HushAssets Contract

The main contract handles:
- Asset creation and management
- Portfolio creation and tracking
- Encrypted transaction execution
- Performance metrics calculation
- User reputation system

### Key Functions

- `createAsset()`: Create encrypted assets
- `createPortfolio()`: Create encrypted portfolios
- `executeTransaction()`: Execute encrypted buy/sell transactions
- `calculatePerformance()`: Calculate encrypted performance metrics
- `verifyAsset()`: Verify asset authenticity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [Hush Assets](https://hush-assets.vercel.app)
- **Documentation**: [FHEVM Docs](https://docs.fhevm.org)
- **Zama Network**: [Zama](https://zama.ai)
- **Starbase4DAO**: [GitHub](https://github.com/starbase4DAO)

## ⚠️ Disclaimer

This is a testnet application for demonstration purposes. Do not use with mainnet funds. Always verify smart contract addresses and test thoroughly before any financial transactions.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Join our Discord community
- Follow us on Twitter [@starbase4dao](https://twitter.com/starbase4dao)

---

**Built with ❤️ by Starbase4DAO using Zama's FHEVM technology**
