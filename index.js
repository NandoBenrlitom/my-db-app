const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'secretpassword',
  database: process.env.DB_NAME || 'testdb',
  port: 5432,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`<h1>Berhasil Terhubung ke Database PostgreSQL!</h1><p>Waktu Database: ${result.rows[0].now}</p>`);
  } catch (err) {
    res.status(500).send(`<h1>Gagal Terhubung ke Database:</h1> <pre>${err.message}</pre>`);
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
