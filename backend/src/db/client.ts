import { Pool } from 'pg';
import dotenv from 'dotenv';
import { schema } from './schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function initDb() {
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
