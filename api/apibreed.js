// /api/breed.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { data, error } = await supabase
    .from('breeds')
    .select('*');

  if (error) {
    console.error("Error fetching dog breeds:", error);
    return res.status(500).json({ error: 'Failed to fetch breeds' });
  }

  res.status(200).json(data);
};