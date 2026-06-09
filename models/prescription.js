const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    medicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MedicalRecord',
    },
    medications: [
      {
        name: String,
        dosage: String,
        duration: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);
