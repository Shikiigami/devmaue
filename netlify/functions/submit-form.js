// netlify/functions/submit-form.js
const { Client } = require("pg");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Connect to Neon PostgreSQL
    const client = new Client({
      connectionString: process.env.DATABASE_URL, 
      ssl: { rejectUnauthorized: false }, 
    });

    await client.connect();
    await client.query(
      "INSERT INTO messages (name, email, message, created_at) VALUES ($1, $2, $3, NOW())",
      [data.name, data.email, data.message]
    );

    await client.end();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: true,
        message: "Form saved to PostgreSQL!",
      }),
    };
  } catch (err) {
    console.error("DB Error:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        success: false,
        message: "Database error. Check logs.",
      }),
    };
  }
};
