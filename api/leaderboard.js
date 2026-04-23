// Serverless Function for Leaderboard API
// Deploy on Vercel/Netlify for free

const getDB = () => {
  // In production, use external database like:
  // - Firebase Firestore
  // - Supabase
  // - MongoDB Atlas
  // For demo, using in-memory storage
  if (!global.leaderboard) {
    global.leaderboard = [
      { name: 'Sarah M.', time: 185, date: '2026-04-22', accuracy: 95 },
      { name: 'John D.', time: 203, date: '2026-04-21', accuracy: 88 },
      { name: 'Emma L.', time: 217, date: '2026-04-23', accuracy: 92 },
      { name: 'Mike R.', time: 245, date: '2026-04-20', accuracy: 85 },
      { name: 'Lisa K.', time: 268, date: '2026-04-22', accuracy: 90 },
    ];
  }
  return global.leaderboard;
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const db = getDB();

  if (req.method === 'GET') {
    // Get leaderboard - sorted by time
    const sorted = [...db].sort((a, b) => a.time - b.time);
    return res.status(200).json({ success: true, data: sorted });
  }

  if (req.method === 'POST') {
    // Add new score
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

    db.push(newEntry);

    // Sort and keep top 100
    const sorted = [...db].sort((a, b) => a.time - b.time).slice(0, 100);

    // In production, save to database here
    // For demo, just return the updated list
    return res.status(200).json({ success: true, data: sorted, rank: sorted.findIndex(e => e.name === newEntry.name) + 1 });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
