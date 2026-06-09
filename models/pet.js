const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    breed: String,
    gender: {
      type: String,
      enum: ['Male', 'Female'],
    },
    age: Number,
    weight: Number,
    color: String,
    photo: String,
    vaccinationStatus: {
      type: String,
      default: 'Not Updated',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', petSchema);
