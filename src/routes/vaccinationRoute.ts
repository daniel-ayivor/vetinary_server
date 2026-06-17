import express from "express";
import * as VaccinationController from "../controllers/VaccinationController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

/* Create vaccination (vet + admin) */
router.post(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  VaccinationController.createVaccination
);

/* Get all vaccinations (vet + admin) */
router.get(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  VaccinationController.getVaccinations
);

/* Get pet vaccinations */
router.get(
  "/pet/:petId",
  protect,
  authorize("pet_owner", "veterinarian", "admin"),
  VaccinationController.getVaccinations
);

/* Delete vaccination (admin only) */
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  VaccinationController.deleteVaccination
);

export default router;