# Speak It Out Episode 1 - Deployment Guide

## 🚀 Quick Deploy to Vercel (Free)

### Step 1: Push to GitHub

```bash
cd /Users/chenhong/speak-it-out-project
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/speak-it-out-episode1.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"

Your site will be live at: `https://speak-it-out-episode1.vercel.app`

### Step 3: Share with Students

**Challenge Page:**
```
https://speak-it-out-episode1.vercel.app
```

**Leaderboard Page:**
```
https://speak-it-out-episode1.vercel.app/leaderboard.html
```

## 📱 How Students Use

1. **Start Challenge**: Open the main page, scroll to Module 01, click "Start Challenge"
2. **Enter Name**: Input name and begin
3. **Complete 15 Sentences**: Arrange words to form correct sentences
4. **View Results**: See final time and accuracy
5. **Submit Score**: Scan QR code or visit leaderboard page to submit

## 🏆 Leaderboard Features

- **Real-time Updates**: Refreshes every 10 seconds
- **Local Fallback**: Works offline with localStorage
- **Export/Import**: Share leaderboard data as JSON
- **Top 100**: Displays top 100 players sorted by time

## 🔧 API Endpoint

The leaderboard uses:
- **Production**: `https://speak-it-out-episode1.vercel.app/api/leaderboard`
- **Fallback**: LocalStorage (works without backend)

## 📊 File Structure

```
speak-it-out-project/
├── index.html           # Main challenge page
├── leaderboard.html     # Global leaderboard
├── api/
│   └── leaderboard.js   # Serverless API function
└── vercel.json          # Vercel configuration
```

## 🎯 For Production Database

To enable persistent multi-player sync:

1. **Firebase Setup**:
   - Create project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Firestore Database
   - Update `api/leaderboard.js` to use Firebase Admin SDK

2. **Or use Supabase** (easier):
   - Create project at [supabase.com](https://supabase.com)
   - Create table: `leaderboard (name, time, accuracy, date)`
   - Update API to use Supabase client

## 💡 Tips

- Test locally: `vercel dev`
- Check deployment: `vercel --logs`
- Update code: `git push` triggers auto-deploy
