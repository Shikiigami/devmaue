import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_oF3KVPWzdAm8@ep-tiny-credit-aejm8qsz-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require', // replace with your Neon URL
});

app.post('/submit-form', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(200).send('Message saved!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving message');
  }
});
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

