# Cloudflare Pages Deployment Guide

This project has been configured for deployment to Cloudflare Pages.

## Deployment Steps

### 1. Connect Repository to Cloudflare Pages

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository: `EcoFreshDryCleaner/admin`

### 2. Configure Build Settings

- **Framework preset**: Vite
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/admin` (if your repository contains multiple projects)

### 3. SPA Configuration

The project includes a `wrangler.toml` file with the proper SPA configuration:

```toml
[assets]
directory = "./dist/"
not_found_handling = "single-page-application"
binding = "ASSETS"
```

This configuration tells Cloudflare Pages to:

- Serve static assets from the `dist/` directory
- Handle 404 errors by serving `index.html` for client-side routing
- Enable proper SPA routing support

### 4. Environment Variables (if needed)

If you need to set any environment variables:

- Go to your project settings in Cloudflare Pages
- Navigate to "Environment variables"
- Add any required variables (e.g., Firebase config overrides)

### 5. Custom Domain (Optional)

1. In your Cloudflare Pages project settings
2. Go to "Custom domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Key Changes Made for Cloudflare Pages

1. **Removed GitHub Pages base path**: Changed from `/admin/` to `/` in `vite.config.js`
2. **Added SPA routing support**: Created `public/_redirects` file for client-side routing
3. **Configured SPA handling**: Added `wrangler.toml` with `not_found_handling = "single-page-application"`
4. **Removed GitHub Pages dependencies**: Removed `gh-pages` package and deployment scripts
5. **Optimized build configuration**: Added build optimizations in Vite config

## Build Process

The application will automatically build and deploy when you push to your main branch. The build process:

1. Installs dependencies (`npm install`)
2. Builds the application (`npm run build`)
3. Deploys the `dist` folder to Cloudflare Pages

## Local Development

To test the build locally:

```bash
npm run build
npm run preview
```

This will build the application and serve it locally to verify everything works correctly.

## Firebase Configuration

The Firebase configuration is already set up in `src/firebase/config.js`. Make sure your Firebase project allows the new Cloudflare Pages domain in the authorized domains list.
