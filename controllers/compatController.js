const mongoose = require('mongoose');
const { Pet, Veterinarian, Appointment, Article, MedicalRecord, Notification } = require('../models');

function petRowFromDoc(doc) {
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

exports.getPets = async (req, res) => {
  try {
    const ownerId = req.query.owner_id;
    const query = ownerId ? { owner: ownerId } : {};
    const docs = await Pet.find(query).sort({ createdAt: -1 });
    res.json(docs.map(petRowFromDoc));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPet = async (req, res) => {
  try {
    const body = req.body || {};
    const ownerId = body.owner_id || body.owner || (req.user && req.user.id);
    if (!ownerId) return res.status(400).json({ message: 'owner_id required' });
    const pet = await Pet.create({
      owner: ownerId,
      name: body.name,
      species: body.species,
      breed: body.breed,
      age: body.age,
      weight: body.weight,
      gender: body.gender,
      photo: body.photo,
      vaccinationStatus: body.health_label || body.vaccinationStatus || 'Not Updated',
    });
    res.status(201).json(petRowFromDoc(pet));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVets = async (req, res) => {
  try {
    const docs = await Veterinarian.find().populate('user');
    const rows = docs.map((d) => ({
      id: d._id.toString(),
      name: d.user ? d.user.fullName : d.name || 'Unknown',
      specialization: d.specialization || '',
      experience_years: d.yearsOfExperience || 0,
      rating: d.rating || 0,
      reviews_count: d.reviewsCount || 0,
      location: d.location || 'Ghana',
      photo: d.photo || null,
      available: d.available ?? true,
      bio: d.bio || null,
      consultation_fee: d.consultationFee || 0,
      user_id: d.user ? d.user._id.toString() : null,
      created_at: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
    }));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVetByUserId = async (req, res) => {
  try {
    const userId = req.query.user_id || req.params.user_id;
    if (!userId) return res.json(null);
    const doc = await Veterinarian.findOne({ user: userId }).populate('user');
    if (!doc) return res.json(null);
    res.json({
      id: doc._id.toString(),
      name: doc.user ? doc.user.fullName : doc.name || 'Unknown',
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateVet = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Veterinarian.findByIdAndUpdate(id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ id: doc._id.toString() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleVetAvailability = async (req, res) => {
  try {
    const id = req.params.id;
    const { available } = req.body;
    await Veterinarian.findByIdAndUpdate(id, { available });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const ownerId = req.query.owner_id;
    const query = ownerId ? { petOwner: ownerId } : {};
    const docs = await Appointment.find(query).sort({ scheduled_at: -1 });
    const rows = docs.map((d) => ({
      id: d._id.toString(),
      owner_id: d.petOwner ? d.petOwner.toString() : null,
      vet_id: d.veterinarian ? d.veterinarian.toString() : null,
      pet_id: d.pet ? d.pet.toString() : null,
      scheduled_at: d.appointmentDate ? d.appointmentDate.toISOString() : null,
      status: d.status,
      notes: d.reason || null,
      created_at: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
    }));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const body = req.body;
    const doc = await Appointment.create({
      petOwner: body.owner_id,
      veterinarian: body.vet_id,
      pet: body.pet_id,
      appointmentDate: body.scheduled_at,
      reason: body.notes,
      status: body.status || 'pending',
    });
    res.status(201).json({ id: doc._id.toString() });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArticles = async (req, res) => {
  try {
    const docs = await Article.find().sort({ createdAt: -1 });
    const rows = docs.map((d) => ({
      id: d._id.toString(),
      title: d.title,
      content: d.content,
      category: d.category || 'General',
      image: d.image || null,
      excerpt: d.excerpt || null,
      read_time: d.readTime || null,
      created_at: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
    }));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMedicalRecords = async (req, res) => {
  try {
    const ownerId = req.query.owner_id;
    const query = ownerId ? { owner: ownerId } : {};
    const docs = await MedicalRecord.find(query).sort({ visitDate: -1 });
    const rows = docs.map((d) => ({
      id: d._id.toString(),
      owner_id: d.owner ? d.owner.toString() : null,
      pet_id: d.pet ? d.pet.toString() : null,
      diagnosis: d.diagnosis || null,
      symptoms: d.symptoms || [],
      treatment: d.treatment || null,
      visit_date: d.visitDate ? d.visitDate.toISOString() : new Date().toISOString(),
      created_at: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
    }));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.query.user_id;
    
    // CRITICAL FIX: Check for undefined or invalid user_id
    if (!userId || userId === 'undefined' || userId === 'null' || userId === '') {
      console.log('getNotifications: Invalid user_id received:', userId);
      return res.status(200).json([]);
    }
    
    // Validate MongoDB ObjectId format
    const mongoose = require('mongoose');
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('getNotifications: Invalid ObjectId format:', userId);
      return res.status(200).json([]);
    }
    
    // Safe to query now
    const query = { recipient: userId };
    const docs = await Notification.find(query).sort({ createdAt: -1 });
    
    const rows = docs.map((d) => ({
      id: d._id.toString(),
      user_id: d.recipient ? d.recipient.toString() : null,
      title: d.title,
      description: d.message || null,
      tone: 'info',
      read: d.isRead || false,
      created_at: d.createdAt ? d.createdAt.toISOString() : new Date().toISOString(),
    }));
    
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error in getNotifications:', err);
    // Always return empty array on error
    res.status(200).json([]);
  }
};