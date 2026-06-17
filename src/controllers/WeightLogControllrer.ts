import { Request, Response } from "express";
import WeightLog from "../models/PetWeightTrack";

export const createWeightLog = async (
  req: Request,
  res: Response
) => {
  try {
    const log = await WeightLog.create(req.body);

    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getWeightLogs = async (
  req: Request,
  res: Response
) => {
  try {
    const logs = await WeightLog.find({
      pet: req.params.petId,
    }).sort({ recordedAt: -1 });

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};