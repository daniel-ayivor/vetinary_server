const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinarian',
    },
    diagnosis: String,
    symptoms: [String],
    treatment: String,
    notes: String,
    visitDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
