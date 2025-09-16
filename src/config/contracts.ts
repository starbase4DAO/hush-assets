import { Address } from 'viem';

// Contract addresses for Sepolia testnet
export const CONTRACTS = {
  HUSH_ASSETS: '0x0000000000000000000000000000000000000000' as Address, // Will be deployed
  FHE_TOKEN: '0x0000000000000000000000000000000000000000' as Address, // Will be deployed
} as const;

// Contract ABIs will be imported from generated files
export const CONTRACT_ABIS = {
  HUSH_ASSETS: [], // Will be populated after deployment
  FHE_TOKEN: [], // Will be populated after deployment
} as const;
