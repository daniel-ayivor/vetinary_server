import { Request, Response } from "express";
import Vaccination from "../models/vaccineRecordsModel";

export const createVaccination = async (
  req: Request,
  res: Response
) => {
  try {
    const vaccination = await Vaccination.create(req.body);

    res.status(201).json({
      success: true,
      data: vaccination,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVaccinations = async (
  req: Request,
  res: Response
) => {
  try {
    const vaccinations = await Vaccination.find()
      .populate("pet")
      .populate("veterinarian");

    res.status(200).json({
      success: true,
      data: vaccinations,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVaccination = async (
  req: Request,
  res: Response
) => {
  try {
    await Vaccination.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Vaccination deleted",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};