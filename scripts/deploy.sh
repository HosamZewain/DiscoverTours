#!/bin/bash

# Navigate to project directory
cd /var/www/discover-tours

# Pull latest changes
git pull origin main

# Install dependencies and build frontend
echo "Building frontend..."
npm install
npm run build

# Install dependencies and build backend
echo "Building backend..."
cd server
npm install
npm run build
cd ..

# Restart backend service
# Assuming PM2 is used with a process name like 'discover-tours-api'
# If not using PM2, adjust accordingly
if command -v pm2 &> /dev/null; then
    echo "Restarting backend with PM2..."
    pm2 restart discover-tours-api || pm2 start server/dist/index.js --name discover-tours-api
else
    echo "PM2 not found. Please ensure your backend is running."
fi

echo "Deployment complete! Don't forget to reload Nginx if you changed the config: sudo systemctl reload nginx"
