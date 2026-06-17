import express from "express";
import * as WeightController from "../controllers/WeightLogControllrer";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("pet_owner", "veterinarian"),
  WeightController.createWeightLog
);

router.get(
  "/:petId",
  protect,
  authorize("pet_owner", "veterinarian", "admin"),
  WeightController.getWeightLogs
);

export default router;