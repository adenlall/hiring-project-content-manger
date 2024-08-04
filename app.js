import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";

import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import entryRoutes from './routes/entry.route.js';

import { authLimiter } from './utils/middleware/limit.middleware.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
// app.use(cors()); // if the client on deffrent domain
app.use(express.json({ limit: '10mb' })); // set max body to 10MB
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') app.use(authLimiter);
app.use(helmet()); // Help secure Express apps by setting HTTP response headers


// Routes
app.use('/auth', authRoutes);
app.use('/entry', entryRoutes);

// To Show Errors as Json // and without exposing stack layer
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log("\n\n");
  console.log(`Server running on port ${PORT}`);
  console.log("\n\n");
});