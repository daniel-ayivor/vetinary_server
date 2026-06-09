const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| USER MODEL
|--------------------------------------------------------------------------
*/

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["pet_owner", "veterinarian", "admin"],
      default: "pet_owner",
    },

    phone: String,

    profileImage: String,

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

/*
|--------------------------------------------------------------------------
| VETERINARIAN MODEL
|--------------------------------------------------------------------------
*/

const veterinarianSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  },
  { timestamps: true }
);

const Veterinarian = mongoose.model(
  "Veterinarian",
  veterinarianSchema
);

/*
|--------------------------------------------------------------------------
| PET MODEL
|--------------------------------------------------------------------------
*/

const petSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["Male", "Female"],
    },

    age: Number,

    weight: Number,

    color: String,

    photo: String,

    vaccinationStatus: {
      type: String,
      default: "Not Updated",
    },
  },
  { timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

/*
|--------------------------------------------------------------------------
| APPOINTMENT MODEL
|--------------------------------------------------------------------------
*/

const appointmentSchema = new mongoose.Schema(
  {
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
      required: true,
    },

    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    reason: String,

    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model(
  "Appointment",
  appointmentSchema
);

/*
|--------------------------------------------------------------------------
| CONSULTATION MODEL
|--------------------------------------------------------------------------
*/

const consultationSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
    },

    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
    },

    notes: String,

    diagnosis: String,

    consultationType: {
      type: String,
      enum: ["virtual", "physical"],
      default: "virtual",
    },

    meetingLink: String,
  },
  { timestamps: true }
);

const Consultation = mongoose.model(
  "Consultation",
  consultationSchema
);

/*
|--------------------------------------------------------------------------
| MEDICAL RECORD MODEL
|--------------------------------------------------------------------------
*/

const medicalRecordSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },

    veterinarian: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Veterinarian",
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

const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);

/*
|--------------------------------------------------------------------------
| PRESCRIPTION MODEL
|--------------------------------------------------------------------------
*/

const prescriptionSchema = new mongoose.Schema(
  {
    medicalRecord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
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

const Prescription = mongoose.model(
  "Prescription",
  prescriptionSchema
);

/*
|--------------------------------------------------------------------------
| NOTIFICATION MODEL
|--------------------------------------------------------------------------
*/

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: String,

    message: String,

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

/*
|--------------------------------------------------------------------------
| HEALTH ARTICLE MODEL
|--------------------------------------------------------------------------
*/

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    category: String,

    image: String,

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
  User,
  Veterinarian,
  Pet,
  Appointment,
  Consultation,
  MedicalRecord,
  Prescription,
  Notification,
  Article,
};