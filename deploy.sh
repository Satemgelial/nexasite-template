#!/bin/bash
# deploy.sh - Automated deployment script

echo "🚀 Starting deployment..."
echo "Choose platform:"
echo "1) Vercel"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) All platforms"

read -p "Enter choice (1-4): " choice

case $choice in
  1)
    echo "Deploying to Vercel..."
    vercel --prod
    ;;
  2)
    echo "Deploying to Netlify..."
    netlify deploy --prod
    ;;
  3)
    echo "Deploying to GitHub Pages..."
    git push origin main
    ;;
  4)
    echo "Deploying to all platforms..."
    vercel --prod
    netlify deploy --prod
    git push origin main
    ;;
  *)
    echo "Invalid choice"
    ;;
esac

echo "✅ Deployment complete!"
