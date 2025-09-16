import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from './env';

export const wagmiConfig = getDefaultConfig({
  appName: 'Hush Assets',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
