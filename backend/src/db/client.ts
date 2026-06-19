import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(__dirname, '../../dinochat.db');

const db = new Database(DB_PATH);

export function initDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema);
  console.log('Database initialized successfully.');
}

// Allow running init directly if needed
if (require.main === module || process.argv.includes('init')) {
  initDb();
}

export default db;
