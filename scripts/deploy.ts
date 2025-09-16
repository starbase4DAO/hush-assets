import { ethers } from "hardhat";

async function main() {
  console.log("Deploying HushAssets contract...");

  // Get the contract factory
  const HushAssets = await ethers.getContractFactory("HushAssets");

  // Deploy the contract with verifier and oracle addresses
  // In production, these should be actual addresses
  const verifier = "0x0000000000000000000000000000000000000000"; // Replace with actual verifier address
  const oracle = "0x0000000000000000000000000000000000000000"; // Replace with actual oracle address

  const hushAssets = await HushAssets.deploy(verifier, oracle);

  await hushAssets.waitForDeployment();

  const contractAddress = await hushAssets.getAddress();
  console.log("HushAssets deployed to:", contractAddress);

  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };

  fs.writeFileSync(
    './src/config/contract-addresses.json',
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract address saved to src/config/contract-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
