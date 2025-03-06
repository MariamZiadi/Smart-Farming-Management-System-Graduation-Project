import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import plantRoutes from './routes/plantRoutes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/plants', plantRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
