// Vercel Serverless Function for Leaderboard
// Uses Supabase for persistent multi-user storage

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'your-anon-key';

async function dbQuery(sql, params = {}) {
  if (!process.env.SUPABASE_URL) {
    return null;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
      method: sql.method || 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': sql.prefer || ''
      },
      body: sql.body ? JSON.stringify(params) : null
    });

    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.log('Database error:', e);
  }
  return null;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  if (req.method === 'GET') {
    let scores = await dbQuery({ method: 'GET', prefer: 'order=time.asc' });
    if (!scores) {
      return res.status(200).json({ success: true, data: [], message: 'No database configured' });
    }
    return res.status(200).json({ success: true, data: scores });
  }

  if (req.method === 'POST') {
    const { name, time, accuracy, round } = req.body;
    if (!name || time === undefined) {
      return res.status(400).json({ success: false, error: 'Missing: name or time' });
    }

    const newScore = {
      name: name.substring(0, 20),
      time: Math.floor(time),
      accuracy: Math.floor(accuracy) || 0,
      date: new Date().toISOString().split('T')[0],
      round: round || 'Unknown',
      created_at: new Date().toISOString()
    };

    const saved = await dbQuery({ method: 'POST', prefer: 'return=representation' }, newScore);
    let allScores = await dbQuery({ method: 'GET', prefer: 'order=time.asc' }) || [newScore];
    const sorted = allScores.sort((a, b) => a.time - b.time).slice(0, 100);
    const rank = sorted.findIndex(e => e.name === newScore.name && e.time === newScore.time) + 1;

    return res.status(200).json({ success: true, data: sorted, rank, database: saved ? 'connected' : 'fallback' });
  }

  return res.status(405).json({ success: false, error: 'Method not allowed' });
}
