import { Request, Response } from "express";
import Allergy from "../models/PetAllergyRecords";

export const createAllergy = async (
  req: Request,
  res: Response
) => {
  try {
    const allergy = await Allergy.create(req.body);

    res.status(201).json({
      success: true,
      data: allergy,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllergies = async (
  req: Request,
  res: Response
) => {
  try {
    const allergies = await Allergy.find().populate("pet");

    res.status(200).json({
      success: true,
      data: allergies,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetAllergies = async (
  req: Request,
  res: Response
) => {
  try {
    const allergies = await Allergy.find({
      pet: req.params.petId,
    });

    res.status(200).json({
      success: true,
      data: allergies,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};