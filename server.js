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

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/leaderboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'leaderboard.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Speak It Out server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌐 Railway: https://your-app.railway.app`);
});
