const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
    },
    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Veterinarian',
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
    },
    notes: String,
    diagnosis: String,
    consultationType: {
      type: String,
      enum: ['virtual', 'physical'],
      default: 'virtual',
    },
    meetingLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Consultation', consultationSchema);
