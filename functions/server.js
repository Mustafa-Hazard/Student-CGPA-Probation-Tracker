import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { onRequest } from "firebase-functions/v2/https"; // <-- Added this critical import!
import probationRoutes from './routes/probationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Pointing up one directory level to your public assets directory
app.use(express.static(path.join(__dirname, '../public')));

// API Endpoint routes
app.use('/api', probationRoutes);

// Local development fallback server check
app.listen(PORT, () => {
  console.log(`Server running smoothly at http://localhost:${PORT}`);
});

// Firebase Cloud Function deployment handler
export const api = onRequest({ cors: true }, app);