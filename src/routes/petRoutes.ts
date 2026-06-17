import express from "express";
import {
  createPet,
  getPets,
  getPet,
  updatePet,
  deletePet,
} from "../controllers/petsController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();


// Get all pets
router.get("/",  authorize("admin", "veterinarian"), getPets);

// Get single pet
router.get("/:id",  authorize("pet_owner", "veterinarian", "admin"), getPet);

// Create pet
router.post("/",   authorize("pet_owner"), createPet);

// Update pet
router.put("/:id",  authorize("pet_owner", "admin"), updatePet);
router.patch("/:id",  authorize("pet_owner", "admin"), updatePet);

// Delete pet
router.delete("/:id",  authorize("admin"), deletePet);

export default router;