// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract HushAssets is SepoliaConfig {
    using FHE for *;
    
    struct Asset {
        euint32 assetId;
        euint32 value;
        euint32 riskScore;
        euint32 liquidityScore;
        bool isActive;
        bool isVerified;
        string name;
        string symbol;
        string description;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Portfolio {
        euint32 portfolioId;
        euint32 totalValue;
        euint32 riskLevel;
        euint32 assetCount;
        bool isPublic;
        bool isActive;
        string name;
        string description;
        address owner;
        uint256 createdAt;
        uint256 updatedAt;
    }
    
    struct Transaction {
        euint32 transactionId;
        euint32 amount;
        euint32 assetId;
        euint32 portfolioId;
        bool isBuy;
        bool isCompleted;
        address trader;
        uint256 timestamp;
    }
    
    struct PerformanceMetrics {
        euint32 portfolioId;
        euint32 totalReturn;
        euint32 volatility;
        euint32 sharpeRatio;
        euint32 maxDrawdown;
        bool isCalculated;
        uint256 calculatedAt;
    }
    
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => Portfolio) public portfolios;
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => PerformanceMetrics) public performanceMetrics;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userBalance;
    mapping(address => mapping(uint256 => euint32)) public userAssetHoldings;
    mapping(address => mapping(uint256 => euint32)) public userPortfolioShares;
    
    uint256 public assetCounter;
    uint256 public portfolioCounter;
    uint256 public transactionCounter;
    uint256 public performanceCounter;
    
    address public owner;
    address public verifier;
    address public oracle;
    
    event AssetCreated(uint256 indexed assetId, address indexed owner, string name);
    event AssetUpdated(uint256 indexed assetId, address indexed owner);
    event PortfolioCreated(uint256 indexed portfolioId, address indexed owner, string name);
    event PortfolioUpdated(uint256 indexed portfolioId, address indexed owner);
    event TransactionExecuted(uint256 indexed transactionId, uint256 indexed portfolioId, address indexed trader);
    event PerformanceCalculated(uint256 indexed portfolioId, uint32 totalReturn);
    event AssetVerified(uint256 indexed assetId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier, address _oracle) {
        owner = msg.sender;
        verifier = _verifier;
        oracle = _oracle;
    }
    
    function createAsset(
        string memory _name,
        string memory _symbol,
        string memory _description,
        externalEuint32 _initialValue,
        externalEuint32 _riskScore,
        externalEuint32 _liquidityScore,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Asset name cannot be empty");
        require(bytes(_symbol).length > 0, "Asset symbol cannot be empty");
        require(msg.sender != address(0), "Invalid sender address");
        
        uint256 assetId = assetCounter++;
        
        // Convert external encrypted values to internal using FHE
        euint32 internalValue = FHE.fromExternal(_initialValue, inputProof);
        euint32 internalRiskScore = FHE.fromExternal(_riskScore, inputProof);
        euint32 internalLiquidityScore = FHE.fromExternal(_liquidityScore, inputProof);
        
        // Encrypt the asset ID as well for complete privacy
        euint32 encryptedAssetId = FHE.asEuint32(assetId);
        
        assets[assetId] = Asset({
            assetId: encryptedAssetId,
            value: internalValue,
            riskScore: internalRiskScore,
            liquidityScore: internalLiquidityScore,
            isActive: true,
            isVerified: false,
            name: _name,
            symbol: _symbol,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        // Update user reputation based on asset creation
        userReputation[msg.sender] = FHE.add(userReputation[msg.sender], FHE.asEuint32(10));
        
        emit AssetCreated(assetId, msg.sender, _name);
        return assetId;
    }
    
    function updateAssetValue(
        uint256 assetId,
        externalEuint32 newValue,
        bytes calldata inputProof
    ) public {
        require(assets[assetId].owner == msg.sender || msg.sender == oracle, "Not authorized to update asset");
        require(assets[assetId].isActive, "Asset is not active");
        
        euint32 internalNewValue = FHE.fromExternal(newValue, inputProof);
        assets[assetId].value = internalNewValue;
        assets[assetId].updatedAt = block.timestamp;
        
        emit AssetUpdated(assetId, msg.sender);
    }
    
    function createPortfolio(
        string memory _name,
        string memory _description,
        externalEuint32 _initialValue,
        externalEuint32 _riskLevel,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Portfolio name cannot be empty");
        
        uint256 portfolioId = portfolioCounter++;
        
        euint32 internalValue = FHE.fromExternal(_initialValue, inputProof);
        euint32 internalRiskLevel = FHE.fromExternal(_riskLevel, inputProof);
        
        portfolios[portfolioId] = Portfolio({
            portfolioId: FHE.asEuint32(0), // Will be set properly later
            totalValue: internalValue,
            riskLevel: internalRiskLevel,
            assetCount: FHE.asEuint32(0),
            isPublic: false,
            isActive: true,
            name: _name,
            description: _description,
            owner: msg.sender,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        
        emit PortfolioCreated(portfolioId, msg.sender, _name);
        return portfolioId;
    }
    
    function executeTransaction(
        uint256 portfolioId,
        uint256 assetId,
        externalEuint32 amount,
        bool isBuy,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(portfolios[portfolioId].owner == msg.sender, "Not portfolio owner");
        require(portfolios[portfolioId].isActive, "Portfolio is not active");
        require(assets[assetId].isActive, "Asset is not active");
        require(assets[assetId].isVerified, "Asset is not verified");
        
        uint256 transactionId = transactionCounter++;
        
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            assetId: FHE.asEuint32(assetId),
            portfolioId: FHE.asEuint32(portfolioId),
            isBuy: isBuy,
            isCompleted: false,
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update portfolio and asset holdings
        if (isBuy) {
            userAssetHoldings[msg.sender][assetId] = FHE.add(
                userAssetHoldings[msg.sender][assetId], 
                internalAmount
            );
            portfolios[portfolioId].totalValue = FHE.add(
                portfolios[portfolioId].totalValue, 
                FHE.mul(internalAmount, assets[assetId].value)
            );
        } else {
            userAssetHoldings[msg.sender][assetId] = FHE.sub(
                userAssetHoldings[msg.sender][assetId], 
                internalAmount
            );
            portfolios[portfolioId].totalValue = FHE.sub(
                portfolios[portfolioId].totalValue, 
                FHE.mul(internalAmount, assets[assetId].value)
            );
        }
        
        portfolios[portfolioId].updatedAt = block.timestamp;
        transactions[transactionId].isCompleted = true;
        
        emit TransactionExecuted(transactionId, portfolioId, msg.sender);
        return transactionId;
    }
    
    function calculatePerformance(
        uint256 portfolioId,
        externalEuint32 totalReturn,
        externalEuint32 volatility,
        externalEuint32 sharpeRatio,
        externalEuint32 maxDrawdown,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == oracle, "Only oracle can calculate performance");
        require(portfolios[portfolioId].owner != address(0), "Portfolio does not exist");
        
        uint256 performanceId = performanceCounter++;
        
        euint32 internalTotalReturn = FHE.fromExternal(totalReturn, inputProof);
        euint32 internalVolatility = FHE.fromExternal(volatility, inputProof);
        euint32 internalSharpeRatio = FHE.fromExternal(sharpeRatio, inputProof);
        euint32 internalMaxDrawdown = FHE.fromExternal(maxDrawdown, inputProof);
        
        performanceMetrics[performanceId] = PerformanceMetrics({
            portfolioId: FHE.asEuint32(portfolioId),
            totalReturn: internalTotalReturn,
            volatility: internalVolatility,
            sharpeRatio: internalSharpeRatio,
            maxDrawdown: internalMaxDrawdown,
            isCalculated: true,
            calculatedAt: block.timestamp
        });
        
        emit PerformanceCalculated(portfolioId, 0); // Will be decrypted off-chain
        return performanceId;
    }
    
    function verifyAsset(uint256 assetId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify assets");
        require(assets[assetId].owner != address(0), "Asset does not exist");
        
        assets[assetId].isVerified = isVerified;
        emit AssetVerified(assetId, isVerified);
    }
    
    function updateUserReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        userReputation[user] = reputation;
        emit ReputationUpdated(user, 0); // Will be decrypted off-chain
    }
    
    function getAssetInfo(uint256 assetId) public view returns (
        string memory name,
        string memory symbol,
        string memory description,
        uint8 value,
        uint8 riskScore,
        uint8 liquidityScore,
        bool isActive,
        bool isVerified,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Asset storage asset = assets[assetId];
        return (
            asset.name,
            asset.symbol,
            asset.description,
            0, // FHE.decrypt(asset.value) - will be decrypted off-chain
            0, // FHE.decrypt(asset.riskScore) - will be decrypted off-chain
            0, // FHE.decrypt(asset.liquidityScore) - will be decrypted off-chain
            asset.isActive,
            asset.isVerified,
            asset.owner,
            asset.createdAt,
            asset.updatedAt
        );
    }
    
    function getPortfolioInfo(uint256 portfolioId) public view returns (
        string memory name,
        string memory description,
        uint8 totalValue,
        uint8 riskLevel,
        uint8 assetCount,
        bool isPublic,
        bool isActive,
        address owner,
        uint256 createdAt,
        uint256 updatedAt
    ) {
        Portfolio storage portfolio = portfolios[portfolioId];
        return (
            portfolio.name,
            portfolio.description,
            0, // FHE.decrypt(portfolio.totalValue) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.riskLevel) - will be decrypted off-chain
            0, // FHE.decrypt(portfolio.assetCount) - will be decrypted off-chain
            portfolio.isPublic,
            portfolio.isActive,
            portfolio.owner,
            portfolio.createdAt,
            portfolio.updatedAt
        );
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        uint8 amount,
        uint8 assetId,
        uint8 portfolioId,
        bool isBuy,
        bool isCompleted,
        address trader,
        uint256 timestamp
    ) {
        Transaction storage transaction = transactions[transactionId];
        return (
            0, // FHE.decrypt(transaction.amount) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.assetId) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.portfolioId) - will be decrypted off-chain
            transaction.isBuy,
            transaction.isCompleted,
            transaction.trader,
            transaction.timestamp
        );
    }
    
    function getPerformanceInfo(uint256 performanceId) public view returns (
        uint8 portfolioId,
        uint8 totalReturn,
        uint8 volatility,
        uint8 sharpeRatio,
        uint8 maxDrawdown,
        bool isCalculated,
        uint256 calculatedAt
    ) {
        PerformanceMetrics storage performance = performanceMetrics[performanceId];
        return (
            0, // FHE.decrypt(performance.portfolioId) - will be decrypted off-chain
            0, // FHE.decrypt(performance.totalReturn) - will be decrypted off-chain
            0, // FHE.decrypt(performance.volatility) - will be decrypted off-chain
            0, // FHE.decrypt(performance.sharpeRatio) - will be decrypted off-chain
            0, // FHE.decrypt(performance.maxDrawdown) - will be decrypted off-chain
            performance.isCalculated,
            performance.calculatedAt
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getUserBalance(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userBalance[user]) - will be decrypted off-chain
    }
    
    function getUserAssetHolding(address user, uint256 assetId) public view returns (uint8) {
        return 0; // FHE.decrypt(userAssetHoldings[user][assetId]) - will be decrypted off-chain
    }
    
    function getUserPortfolioShare(address user, uint256 portfolioId) public view returns (uint8) {
        return 0; // FHE.decrypt(userPortfolioShares[user][portfolioId]) - will be decrypted off-chain
    }
}
