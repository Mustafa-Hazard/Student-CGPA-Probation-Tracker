import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true // Ensures secure connections to Neon Cloud
    }
});

// Test initial connection readiness
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error connecting to Neon Cloud:', err.stack);
    }
    console.log('🚀 Connected to Neon Cloud Database successfully!');
    release();
});

// 🔥 CRITICAL: Catch unexpected background connection drops gracefully
pool.on('error', (err) => {
    console.error('⚠️ Neon pool dropped an idle client connection thread:', err.message);
});

export default pool;