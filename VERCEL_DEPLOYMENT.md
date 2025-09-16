# Vercel Deployment Guide for Hush Assets

This guide provides step-by-step instructions for deploying the Hush Assets application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account with access to the hush-assets repository
- Environment variables ready

## Step-by-Step Deployment

### Step 1: Access Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project" on the dashboard

### Step 2: Import GitHub Repository

1. In the "Import Git Repository" section, search for `starbase4DAO/hush-assets`
2. Click "Import" next to the repository
3. Vercel will automatically detect it's a Vite React project

### Step 3: Configure Project Settings

1. **Project Name**: `hush-assets` (or your preferred name)
2. **Framework Preset**: Vite (should be auto-detected)
3. **Root Directory**: `./` (default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `dist` (default)
6. **Install Command**: `npm install` (default)

### Step 4: Set Environment Variables

Click "Environment Variables" and add the following:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
```

**Important**: 
- Make sure to set these for all environments (Production, Preview, Development)
- Click "Add" after each variable
- Keep the values exactly as shown above

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Vercel will automatically assign a URL like `https://hush-assets-xxx.vercel.app`

### Step 6: Verify Deployment

1. Click on the generated URL to open your deployed app
2. Test wallet connection functionality
3. Verify that the app loads correctly
4. Check that all UI components are working

### Step 7: Custom Domain (Optional)

1. Go to your project dashboard in Vercel
2. Click "Settings" tab
3. Click "Domains" in the sidebar
4. Add your custom domain
5. Follow DNS configuration instructions

## Post-Deployment Configuration

### Update Contract Addresses

After deploying smart contracts to Sepolia:

1. Update `src/config/contracts.ts` with actual contract addresses
2. Commit and push changes
3. Vercel will automatically redeploy

### Environment Variables Management

- **Production**: Use the values provided above
- **Preview**: Same as production for testing
- **Development**: Can use different test values if needed

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Verify TypeScript compilation
   - Check for any missing imports

2. **Environment Variables Not Working**
   - Ensure variables are set for all environments
   - Check variable names match exactly (case-sensitive)
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure network configuration matches

4. **Contract Interaction Fails**
   - Verify contract addresses are correct
   - Check that contracts are deployed to Sepolia
   - Ensure user has Sepolia ETH for gas

### Build Logs

To view build logs:
1. Go to your project dashboard
2. Click on the latest deployment
3. Check "Build Logs" tab for any errors

### Performance Optimization

1. **Enable Analytics**: Go to Settings > Analytics
2. **Configure Edge Functions**: If needed for API routes
3. **Set up Monitoring**: Use Vercel's built-in monitoring

## Automatic Deployments

Vercel automatically deploys when you:
- Push to the main branch (production deployment)
- Create a pull request (preview deployment)
- Push to any other branch (preview deployment)

## Manual Deployment

To trigger a manual deployment:
1. Go to your project dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to Git
2. **API Keys**: Rotate keys regularly
3. **Access Control**: Limit team access as needed
4. **HTTPS**: Vercel provides HTTPS by default

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Performance Monitoring**: Built-in Core Web Vitals tracking
3. **Error Tracking**: Automatic error reporting
4. **Usage Statistics**: Track deployment and usage metrics

## Cost Management

- **Free Tier**: 100GB bandwidth, 100 serverless function executions
- **Pro Tier**: $20/month for increased limits
- **Team Tier**: $20/month per member for team features

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Support**: Available for Pro and Team plans

---

**Deployment URL**: Your app will be available at `https://hush-assets-xxx.vercel.app` after successful deployment.

**Repository**: [github.com/starbase4DAO/hush-assets](https://github.com/starbase4DAO/hush-assets)
