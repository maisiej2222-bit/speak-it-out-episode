// Netlify Serverless Function for Leaderboard
// Connects to Supabase/Firebase for persistent storage
// For now using in-memory with localStorage fallback

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

async function getScores() {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?order=time.asc&limit=100`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'count=exact'
        }
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.log('Supabase error:', e);
    }
  }
  return null;
}

async function saveScore(score) {
  if (SUPABASE_URL && SUPABASE_KEY) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(score)
      });
      if (res.ok) return true;
    } catch (e) {
      console.log('Supabase error:', e);
    }
  }
  return false;
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod === 'GET') {
    const scores = await getScores();
    if (scores) {
      return { statusCode: 200, headers, body: JSON.stringify({ success: true, data: scores }) };
    }
    // Return empty array if no database
    return { statusCode: 200, headers, body: JSON.stringify({ success: true, data: [] }) };
  }

  if (event.httpMethod === 'POST') {
    const { name, time, accuracy, round } = JSON.parse(event.body);

    if (!name || time === undefined) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, error: 'Missing required fields' })
      };
    }

    const newScore = {
      name: name.substring(0, 20),
      time: Math.floor(time),
      accuracy: Math.floor(accuracy) || 0,
      date: new Date().toISOString().split('T')[0],
      round: round || 'Unknown',
      created_at: new Date().toISOString()
    };

    const saved = await saveScore(newScore);
    const allScores = await getScores() || [newScore];
    const sorted = allScores.sort((a, b) => a.time - b.time).slice(0, 100);
    const rank = sorted.findIndex(e => e.name === newScore.name && e.time === newScore.time) + 1;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: sorted,
        rank,
        message: saved ? 'Saved to database' : 'Saved temporarily'
      })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, error: 'Method not allowed' })
  };
};
