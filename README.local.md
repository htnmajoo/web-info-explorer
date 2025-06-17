
# Web Information Explorer - Local Server Setup

This application is designed to run on a local server or VPS with Puppeteer support for web scraping, particularly optimized for LinkedIn and other protected websites.

## Prerequisites

- Node.js 16+ installed
- At least 2GB RAM available
- Local server or VPS environment

## Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

## Local Development

1. Start the development server:
```bash
npm run dev
```

2. For local server configuration, use:
```bash
npx vite --config vite.config.local.ts
```

## Production Deployment (Local Server/VPS)

1. Build the application:
```bash
npm run build
```

2. Serve the built files using a static server:
```bash
# Using serve
npm install -g serve
serve -s dist -l 3000

# Or using any other static server
```

## Puppeteer Configuration

The application uses:
- `puppeteer-extra` for enhanced functionality
- `puppeteer-extra-plugin-stealth` for LinkedIn and protected sites
- Optimized browser flags for server environments

### Browser Requirements

Puppeteer will automatically download Chromium. For VPS deployment, ensure:
- Sufficient disk space (300MB+ for Chromium)
- Required system dependencies are installed

For Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

## Architecture

### Frontend (Browser)
- Uses mock Puppeteer service for UI testing and development
- Provides the same interface as the real service
- Generates realistic sample data for demonstration

### Backend (Server-side)
- Real Puppeteer implementation in `server/puppeteerService.server.ts`
- Should be integrated with Express.js or similar Node.js server
- Handles actual web scraping with stealth mode

## Current Implementation

**Frontend Mode (Current)**
- Mock service provides sample data
- No actual web scraping
- Safe for development and demonstration

**Server Mode (For Production)**
- Move `server/puppeteerService.server.ts` to your Node.js backend
- Create API endpoints for scraping requests
- Replace frontend service calls with HTTP requests to your backend

## Features

- Web scraping with stealth mode
- LinkedIn-optimized scraping
- Login credential support
- Keyword-based content extraction
- Excel export functionality
- Progress tracking
- Local session management

## Usage

1. Enter target website URL
2. Specify keywords to search for
3. Add login credentials if required
4. Click "Start Search" to begin scraping
5. Export results to Excel when complete

## Notes

- This application is NOT suitable for deployment on Vercel, Netlify, or similar serverless platforms
- Designed specifically for VPS or local server environments
- Requires Node.js runtime for Puppeteer functionality
- Memory usage can be high during scraping operations
- Current implementation uses mock data for frontend demonstration
