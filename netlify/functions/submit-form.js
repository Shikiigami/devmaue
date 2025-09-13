import { Client } from "pg";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" })
    };
  }

  try {
    const data = JSON.parse(event.body);

    const client = new Client({
      connectionString: 'postgresql://neondb_owner:npg_oF3KVPWzdAm8@ep-tiny-credit-aejm8qsz-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    await client.query(
      "INSERT INTO messages(name, email, message) VALUES($1, $2, $3)",
      [data.name, data.email, data.message]
    );
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Data saved!" })
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Error saving data" })
    };
  }
}
