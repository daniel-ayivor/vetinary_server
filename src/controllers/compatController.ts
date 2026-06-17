import { Response } from 'express';
import express from "express";

import { AuthRequest } from '../middleware/Middleware';
import mongoose from 'mongoose';
import { Pet, Veterinarian, Appointment, Article, MedicalRecord, Notification } from "../models/index";
// import express from "express";

const router = express.Router();
// --- Type Interfaces ---
interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  fullName: string;
}

interface PetDocument extends mongoose.Document {
  name: string;
  species: string;
  breed?: string | null;
  age?: number | null;
  weight?: number | null;
  gender?: string | null;
  vaccinationStatus?: string | null;
  owner: mongoose.Types.ObjectId;
  photo?: string | null;
  createdAt: Date;
}

interface VeterinarianDocument extends mongoose.Document {
  user?: PopulatedUser;
  name?: string;
  specialization: string;
  yearsOfExperience: number;
  rating: number;
  reviewsCount: number;
  location: string;
  photo?: string | null;
  available: boolean;
  bio?: string | null;
  consultationFee: number;
  createdAt: Date;
}

// --- Helper Functions ---
const getValidId = (id: any): string | undefined => {
  return (typeof id === 'string' && mongoose.Types.ObjectId.isValid(id)) ? id : undefined;
};

function petRowFromDoc(doc: PetDocument) {
  return {
    id: doc._id.toString(),
    name: doc.name,
    species: doc.species,
    breed: doc.breed || null,
    age: doc.age ? String(doc.age) : null,
    weight: doc.weight ? String(doc.weight) : null,
    gender: doc.gender || null,
    health_label: doc.vaccinationStatus || 'Not Updated',
    health_status: doc.vaccinationStatus || 'unknown',
    owner_id: doc.owner ? doc.owner.toString() : null,
    photo: doc.photo || null,
    created_at: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
  };
}

// --- Controller Exports ---

export const getPets = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = getValidId(req.query.owner_id);
    const docs = await Pet.find(ownerId ? { owner: ownerId } : {}).sort({ createdAt: -1 }) as PetDocument[];
    res.json(docs.map(petRowFromDoc));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getVetByUserId = async (req: AuthRequest, res: Response) => {
  try {
    const userId = getValidId(req.query.user_id || req.params.user_id);
    if (!userId) return res.json(null);

    const doc = (await Veterinarian.findOne({ user: userId }).populate('user')) as (VeterinarianDocument | null);
    
    if (!doc) return res.json(null);

    res.json({
      id: doc._id.toString(),
      name: doc.user?.fullName || doc.name || 'Unknown',
      specialization: doc.specialization || '',
      experience_years: doc.yearsOfExperience || 0,
      rating: doc.rating || 0,
      reviews_count: doc.reviewsCount || 0,
      location: doc.location || 'Ghana',
      photo: doc.photo || null,
      available: doc.available ?? true,
      bio: doc.bio || null,
      consultation_fee: doc.consultationFee || 0,
      user_id: doc.user ? doc.user._id.toString() : null,
      created_at: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const ownerId = getValidId(req.query.owner_id);
    const docs = await Appointment.find(ownerId ? { petOwner: ownerId } : {}).sort({ appointmentDate: -1 }) as any[];
    
    const rows = docs.map((d: any) => ({
      id: d._id.toString(),
      owner_id: d.petOwner?.toString() || null,
      vet_id: d.veterinarian?.toString() || null,
      pet_id: d.pet?.toString() || null,
      scheduled_at: d.appointmentDate?.toISOString() || null,
      status: d.status,
      notes: d.reason || null,
      created_at: d.createdAt?.toISOString() || new Date().toISOString(),
    }));
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const userId = getValidId(req.query.user_id);
    if (!userId) return res.status(200).json([]);
    
    const docs = await Notification.find({ recipient: userId }).sort({ createdAt: -1 }) as any[];
    
    const rows = docs.map((d: any) => ({
      id: d._id.toString(),
      user_id: d.recipient?.toString() || null,
      title: d.title,
      description: d.message || null,
      tone: 'info',
      read: d.isRead || false,
      created_at: d.createdAt?.toISOString() || new Date().toISOString(),
    }));
    
    res.status(200).json(rows);
  } catch (err: any) {
    res.status(200).json([]);
  }
};



// routes...

export default router;