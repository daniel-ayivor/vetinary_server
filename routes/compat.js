const express = require('express');
const router = express.Router();
const compat = require('../controllers/compatController');
const notificationController = require('../controllers/notificationController');

// Pets
router.get('/pets', compat.getPets);
router.post('/pets', compat.createPet);

// Vets
router.get('/vets', compat.getVets);
router.get('/vets/by-user', compat.getVetByUserId);
router.patch('/vets/:id', compat.updateVet);
router.post('/vets/:id/availability', compat.toggleVetAvailability);

// Appointments
router.get('/appointments', compat.getAppointments);
router.post('/appointments', compat.createAppointment);

// Articles
router.get('/articles', compat.getArticles);

// Medical records
router.get('/medical_records', compat.getMedicalRecords);

// Notifications
router.get('/notifications', compat.getNotifications);
router.post('/notifications', notificationController.sendNotification);

module.exports = router;
