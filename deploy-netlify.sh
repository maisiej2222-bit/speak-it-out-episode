#!/bin/bash
# Netlify Auto Deploy Script
# Run this script to deploy instantly

set -e

PROJECT_DIR="/Users/chenhong/speak-it-out-project"
DEPLOY_DIR="/tmp/netlify-auto-deploy"

echo "🚀 Speak It Out - Netlify Deploy"
echo "================================="
echo ""

cd "$PROJECT_DIR"

# Create deploy directory
echo "📦 Preparing files..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR/netlify/functions"

# Copy production files
cp *.html *.json *.toml "$DEPLOY_DIR/" 2>/dev/null || true
cp netlify/functions/*.js "$DEPLOY_DIR/netlify/functions/" 2>/dev/null || true

echo "✅ Files ready in: $DEPLOY_DIR"
echo ""
echo "📤 Next step:"
echo "   1. Open: https://app.netlify.com/drop"
echo "   2. Drag folder: $DEPLOY_DIR"
echo "   3. Done!"
echo ""

# Open Netlify Drop and folder
open "$DEPLOY_DIR"
open "https://app.netlify.com/drop"

echo "💡 Tip: After first deployment, link your site for one-command deploys:"
echo "   npm install -g netlify-cli"
echo "   netlify login"
echo "   netlify deploy --prod --dir=$DEPLOY_DIR"
