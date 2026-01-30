import express from 'express';
import { 
  login,
  register,
  deleteUser,
  logout,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/logout', authMiddleware, logout);
router.delete('/me', authMiddleware, deleteUser);

export default router;

