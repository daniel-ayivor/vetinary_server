import { Request, Response } from "express";
import AIDiagnosis from "../models/AiDiseaseDetection";

export const createDiagnosis = async (
  req: Request,
  res: Response
) => {
  try {
    const diagnosis = await AIDiagnosis.create(req.body);

    res.status(201).json({
      success: true,
      data: diagnosis,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getDiagnoses = async (
  req: Request,
  res: Response
) => {
  try {
    const diagnoses = await AIDiagnosis.find()
      .populate("pet");

    res.status(200).json({
      success: true,
      data: diagnoses,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPetDiagnoses = async (
  req: Request,
  res: Response
) => {
  try {
    const diagnoses = await AIDiagnosis.find({
      pet: req.params.petId,
    });

    res.status(200).json({
      success: true,
      data: diagnoses,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};