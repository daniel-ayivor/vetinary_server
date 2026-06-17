import express from "express";
import * as ReviewController from "../controllers/ReviewController";
import { protect } from "../middleware/Middleware";
import { authorize } from "../middleware/Authorize";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("pet_owner"),
  ReviewController.createReview
);

router.get(
  "/vet/:vetId",
  protect,
  authorize("pet_owner", "veterinarian", "admin"),
  ReviewController.getVetReviews
);

export default router;