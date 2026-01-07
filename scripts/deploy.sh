#!/bin/bash

# Exit on error
set -e

# Navigate to project directory
cd /var/www/discover-tours

# Pull latest changes
git pull origin main

# Install dependencies and build frontend
echo "Building frontend..."
npm install --legacy-peer-deps
npm run build

# Install dependencies and build backend
echo "Building backend..."
cd server
npm install --legacy-peer-deps
npm run build
    # Restart backend service
    # We do this inside the server directory so PM2 picks up .env correctly
    if command -v pm2 &> /dev/null; then
        echo "Restarting backend with PM2..."
        # Delete existing process to ensure CWD is updated to server/
        pm2 delete discover-tours-api 2> /dev/null || true
        pm2 start dist/index.js --name discover-tours-api
        pm2 save
    else
        echo "PM2 not found. Please ensure your backend is running."
    fi
cd ..

echo "Deployment complete! Don't forget to reload Nginx if you changed the config: sudo systemctl reload nginx"
