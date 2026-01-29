import express from 'express';
import { signup, login } from '../controllers/authController.js';
// import { auth } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema, loginSchema } from '../schemas/authZod.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;