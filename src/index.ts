require('dotenv').config();
import  express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
import petsRoutes from "./routes/petRoutes";
import notificationRoutes from "./routes/notificationRoute";
import authRoutes  from "./routes/auth";
import compatRoutes from "./routes/compatRoute";
import petRoutes from "./routes/petRoutes";
import vaccinationRoutes from "./routes/vaccinationRoute";
import allergyRoutes from "./routes/AllergyRoutes";
import weightRoutes from "./routes/weightRoutes";
import emergencyRoutes from "./routes/emergencyRoutes";
import diagnosisRoutes from "./routes/aiDiagnosisRoutes";
import reviewRoutes from "./routes/reviewRoutes";

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
  .catch((err: any) => console.error('MongoDB connection error:', err));




app.use("/api/pets", petsRoutes);
app.use('/api/compat', compatRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use("/api/vaccinations", vaccinationRoutes);
app.use("/api/allergies", allergyRoutes);
app.use("/api/weights", weightRoutes);
app.use("/api/emergencies", emergencyRoutes);
app.use("/api/diagnoses", diagnosisRoutes);
app.use("/api/reviews", reviewRoutes);

// 404
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
