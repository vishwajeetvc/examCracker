import express from 'express';
import { 
  login,
  register,
  deleteUser,
  logout,
  getUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUser);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.delete('/', deleteUser);

export default router;

