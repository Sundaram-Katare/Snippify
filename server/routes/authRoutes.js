import express from 'express';
import { signup, login, getProfile, switchTheme } from '../controllers/authController.js';
// import { auth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../schemas/authZod.js';
import { auth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get("/profile", auth, getProfile);
router.patch('/theme', auth, switchTheme);

export default router;