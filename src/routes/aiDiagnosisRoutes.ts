import express from "express";
import * as DiagnosisController from "../controllers/AiDiagnosisController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

/* Upload diagnosis (pet owner + vet) */
router.post(
  "/",
  protect,
  authorize("pet_owner", "veterinarian"),
  DiagnosisController.createDiagnosis
);

/* View all diagnoses (vet + admin) */
router.get(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  DiagnosisController.getDiagnoses
);

/* View pet diagnoses */
router.get(
  "/pet/:petId",
  protect,
  authorize("pet_owner", "veterinarian", "admin"),
  DiagnosisController.getPetDiagnoses
);

export default router;