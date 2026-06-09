const express = require('express');
const router = express.Router();
const petController = require('../controllers/petsController');
const auth = require('../middleware/auth');

router.get('/pets', petController.getPets);
router.get('/pets/:id', petController.getPet);
router.post('/pets', auth, petController.createPet);
router.put('/pets/:id', auth, petController.updatePet);
router.delete('/pets/:id', auth, petController.deletePet);

module.exports = router;
