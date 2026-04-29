const { Client } = require("pg");

const CONNECTION_STRING = process.env.DATABASE_URL;
const ADMIN_SECRET      = process.env.ADMIN_SECRET;

async function getClient() {
  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  return client;
}

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // ── Auth check ──
  const token = event.headers['x-admin-token'];
  if (!token || token !== ADMIN_SECRET) {
    return { statusCode: 401, headers, body: JSON.stringify({ success: false, message: 'Unauthorized' }) };
  }

  const method = event.httpMethod;
  let client;

  try {
    client = await getClient();

    // GET — fetch all messages
    if (method === 'GET') {
      const result = await client.query(
        'SELECT id, name, email, message, created_at FROM messages ORDER BY created_at DESC'
      );
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: result.rows })
      };
    }

    const body = JSON.parse(event.body || '{}');

    // POST — insert new message
    if (method === 'POST') {
      const { name, email, message } = body;
      if (!name || !email || !message) {
        return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Missing fields' }) };
      }
      const result = await client.query(
        'INSERT INTO messages(name, email, message, created_at) VALUES($1,$2,$3,now()) RETURNING *',
        [name, email, message]
      );
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: result.rows[0] })
      };
    }

    // PUT — update a message
    if (method === 'PUT') {
      const { id, name, email, message } = body;
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Missing id' }) };
      const result = await client.query(
        'UPDATE messages SET name=$1, email=$2, message=$3 WHERE id=$4 RETURNING *',
        [name, email, message, id]
      );
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, data: result.rows[0] })
      };
    }

    // DELETE — delete a message
    if (method === 'DELETE') {
      const { id } = body;
      if (!id) return { statusCode: 400, headers, body: JSON.stringify({ success: false, message: 'Missing id' }) };
      await client.query('DELETE FROM messages WHERE id=$1', [id]);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Deleted' })
      };
    }

    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: err.message })
    };
  } finally {
    if (client) await client.end();
  }
}