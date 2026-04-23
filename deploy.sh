#!/bin/bash
# Speak It Out - Auto Deploy Script
# Run this script to deploy with one command

set -e

PROJECT_DIR="/Users/chenhong/speak-it-out-project"
GITHUB_USER="chenhong-speakitout"
REPO_NAME="speak-it-out-episode1"

echo "🚀 Speak It Out - Auto Deploy"
echo "=============================="
echo ""

cd "$PROJECT_DIR"

echo "📦 Step 1: Committing changes..."
git add .
git commit -m "Deploy to Railway" || echo "No changes to commit"

echo ""
echo "📤 Step 2: Pushing to GitHub..."
echo "   Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "⚠️  Please enter your GitHub credentials when prompted..."
echo ""

git push -u origin main

echo ""
echo "✅ Code pushed successfully!"
echo ""
echo "🌐 Step 3: Deploy on Railway"
echo "   1. Visit: https://railway.app/dashboard"
echo "   2. Click: New Project → Deploy from GitHub repo"
echo "   3. Select: $REPO_NAME"
echo "   4. Wait for auto-deployment (~1 min)"
echo ""
echo "📍 Your URLs will be:"
echo "   - Course:    https://$REPO_NAME-production.up.railway.app/"
echo "   - Challenge: https://$REPO_NAME-production.up.railway.app/challenge.html"
echo "   - Leaderboard: https://$REPO_NAME-production.up.railway.app/leaderboard.html"
echo ""
