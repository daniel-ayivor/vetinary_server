import express from "express";
import {
  getPets,
  getVetByUserId,
  getAppointments,
  getNotifications,
} from "../controllers/compatController";

const router = express.Router();

// Pets
router.get("/pets", getPets);

// Vets
router.get("/vets/by-user", getVetByUserId);

// Appointments
router.get("/appointments", getAppointments);

// Notifications
router.get("/notifications", getNotifications);

export default router;