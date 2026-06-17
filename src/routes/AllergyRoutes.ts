import express from "express";
import * as AllergyController from "../controllers/AllergyController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  AllergyController.createAllergy
);

router.get(
  "/",
  protect,
  authorize("veterinarian", "admin"),
  AllergyController.getAllergies
);

router.get(
  "/pet/:petId",
  protect,
  authorize("pet_owner", "veterinarian", "admin"),
  AllergyController.getPetAllergies
);

export default router;