const mongoose = require('mongoose');

const veterinarianSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    specialization: String,
    licenseNumber: String,
    yearsOfExperience: Number,
    bio: String,
    consultationFee: Number,
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    location: String,
    photo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Veterinarian', veterinarianSchema);
