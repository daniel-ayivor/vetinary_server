import express from 'express';
const router = express.Router();
const authController = require('../controllers/authController');
import { protect } from '../middleware/Middleware';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', protect, authController.me);

export default router;
