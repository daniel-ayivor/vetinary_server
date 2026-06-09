require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vetinary';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const petRoutes = require('./routes/pets');
const authRoutes = require('./routes/auth');
const compatRoutes = require('./routes/compat');
app.use('/api', petRoutes);
app.use('/api', compatRoutes);
app.use('/api/auth', authRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
