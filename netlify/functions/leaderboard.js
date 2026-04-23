// Netlify Serverless Function for Leaderboard
exports.handler = async (event, context) => {
  // In-memory storage with round support
  // In production, connect to external DB (Firebase, Supabase, MongoDB)
  const defaultData = [
    { name: 'Sarah M.', time: 185, date: '2026-04-22', accuracy: 95, round: 'Apr 23 R1' },
    { name: 'John D.', time: 203, date: '2026-04-21', accuracy: 88, round: 'Apr 23 R1' },
    { name: 'Emma L.', time: 217, date: '2026-04-23', accuracy: 92, round: 'Apr 23 R1' },
    { name: 'Mike R.', time: 245, date: '2026-04-20', accuracy: 85, round: 'Apr 23 R1' },
    { name: 'Lisa K.', time: 268, date: '2026-04-22', accuracy: 90, round: 'Apr 23 R1' },
  ];

  // Use global to persist across invocations (in same container)
  if (!global.leaderboardData) {
    global.leaderboardData = defaultData;
  }

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
    const sorted = [...global.leaderboardData].sort((a, b) => a.time - b.time);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: sorted })
    };
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

    const newEntry = {
      name: name.substring(0, 20),
      time: Math.floor(time),
      accuracy: Math.floor(accuracy) || 0,
      date: new Date().toISOString().split('T')[0],
      round: round || 'Unknown'
    };

    global.leaderboardData.push(newEntry);
    const sorted = [...global.leaderboardData].sort((a, b) => a.time - b.time).slice(0, 100);
    const rank = sorted.findIndex(e => e.name === newEntry.name && e.time === newEntry.time) + 1;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, data: sorted, rank })
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ success: false, error: 'Method not allowed' })
  };
};
