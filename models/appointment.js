const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinarian',
      required: true,
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
