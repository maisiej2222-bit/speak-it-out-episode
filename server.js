// Express Server for Railway Deployment
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// In-memory leaderboard storage
// For production, connect to external DB (MongoDB Atlas, Supabase, etc.)
let leaderboard = [
  { name: 'Sarah M.', time: 185, date: '2026-04-22', accuracy: 95 },
  { name: 'John D.', time: 203, date: '2026-04-21', accuracy: 88 },
  { name: 'Emma L.', time: 217, date: '2026-04-23', accuracy: 92 },
  { name: 'Mike R.', time: 245, date: '2026-04-20', accuracy: 85 },
  { name: 'Lisa K.', time: 268, date: '2026-04-22', accuracy: 90 },
];

// API: Get leaderboard
app.get('/api/leaderboard', (req, res) => {
  const sorted = [...leaderboard].sort((a, b) => a.time - b.time);
  res.json({ success: true, data: sorted });
});

// API: Submit score
app.post('/api/leaderboard', (req, res) => {
  const { name, time, accuracy } = req.body;

  if (!name || time === undefined) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const newEntry = {
    name: name.substring(0, 20),
    time: Math.floor(time),
    accuracy: Math.floor(accuracy) || 0,
    date: new Date().toISOString().split('T')[0]
  };

  leaderboard.push(newEntry);

  // Sort and keep top 100
  const sorted = [...leaderboard].sort((a, b) => a.time - b.time).slice(0, 100);
  const rank = sorted.findIndex(e => e.name === newEntry.name && e.time === newEntry.time) + 1;

  res.json({ success: true, data: sorted, rank });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/challenge', (req, res) => {
  res.sendFile(path.join(__dirname, 'challenge.html'));
});

app.get('/challenge.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'challenge.html'));
});

app.get('/leaderboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Speak It Out server running on port ${PORT}`);
  console.log(``);
  console.log(`📍 Pages:`);
  console.log(`   Course (Main): http://localhost:${PORT}/`);
  console.log(`   Challenge:     http://localhost:${PORT}/challenge.html`);
  console.log(`   Leaderboard:   http://localhost:${PORT}/leaderboard.html`);
  console.log(``);
  console.log(`🌐 Railway URLs (after deployment):`);
  console.log(`   https://your-app-production.up.railway.app/`);
  console.log(`   https://your-app-production.up.railway.app/challenge.html`);
  console.log(`   https://your-app-production.up.railway.app/leaderboard.html`);
});
