import { Pool } from 'pg';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function initDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  
  const client = await pool.connect();
  try {
    await client.query(schema);
    console.log('Database initialized successfully with PostgreSQL.');
  } catch (err) {
    console.error('Database initialization failed:', err);
  } finally {
    client.release();
  }
}

// Allow running init directly if needed
if (require.main === module || process.argv.includes('init')) {
  initDb();
}

export default pool;
