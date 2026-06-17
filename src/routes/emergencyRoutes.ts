import express from "express";
import * as EmergencyController from "../controllers/EmergencyRequestController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

/* Create emergency (pet owner) */
router.post(
  "/",
  protect,
  authorize("pet_owner"),
  EmergencyController.createEmergencyRequest
);

/* View emergencies (vet + admin) */
router.get(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  EmergencyController.getEmergencyRequests
);

/* Update emergency status (vet + admin) */
router.patch(
  "/:id",
  protect,
  authorize("veterinarian", "admin"),
  EmergencyController.updateEmergencyStatus
);

export default router;