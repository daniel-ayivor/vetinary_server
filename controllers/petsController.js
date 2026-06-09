const { Pet } = require('../models');

exports.createPet = async (req, res) => {
  try {
    const pet = await Pet.create({
      ...req.body,
      owner: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: pet,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('owner', 'fullName email');
    res.status(200).json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPet = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('owner', 'fullName email');
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ success: true, data: pet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.status(200).json({ success: true, message: 'Pet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
