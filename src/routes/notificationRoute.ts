import express from "express";
import { sendNotification } from "../controllers/notificationController";

const router = express.Router();

router.post("/notifications", sendNotification);

export default router;