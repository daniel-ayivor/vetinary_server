import { Request, Response } from "express";
import EmergencyRequest from "../models/Emergency";

export const createEmergencyRequest = async (
  req: Request,
  res: Response
) => {
  try {
    const emergency = await EmergencyRequest.create(req.body);

    res.status(201).json({
      success: true,
      data: emergency,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmergencyRequests = async (
  req: Request,
  res: Response
) => {
  try {
    const emergencies = await EmergencyRequest.find()
      .populate("petOwner")
      .populate("pet");

    res.status(200).json({
      success: true,
      data: emergencies,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmergencyStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const emergency = await EmergencyRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      data: emergency,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};