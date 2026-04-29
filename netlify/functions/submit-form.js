const { Client } = require("pg");

const CONNECTION_STRING = process.env.DATABASE_URL;

exports.handler = async function(event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ message: 'Method Not Allowed' }) };
  }

  let client;
  try {
    const data = JSON.parse(event.body);

    client = new Client({
      connectionString: CONNECTION_STRING,
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    await client.query(
      "INSERT INTO messages(name, email, message, created_at) VALUES($1, $2, $3, now())",
      [data.name, data.email, data.message]
    );

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: "Message sent!" })
    };
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