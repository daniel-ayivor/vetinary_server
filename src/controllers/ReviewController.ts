import { Request, Response } from "express";
import Review from "../models/Review";
import Veterinarian from "../models/veterinarian";

export const createReview = async (
  req: Request,
  res: Response
) => {
  try {
    const review = await Review.create(req.body);

    const reviews = await Review.find({
      veterinarian: req.body.veterinarian,
    });

    const avgRating =
      reviews.reduce((sum, item) => sum + item.rating, 0) /
      reviews.length;

    await Veterinarian.findByIdAndUpdate(
      req.body.veterinarian,
      {
        rating: avgRating,
        reviewsCount: reviews.length,
      }
    );

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getVetReviews = async (
  req: Request,
  res: Response
) => {
  try {
    const reviews = await Review.find({
      veterinarian: req.params.vetId,
    }).populate("petOwner");

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};