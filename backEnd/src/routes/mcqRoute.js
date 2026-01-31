
import express from 'express'
import { addMcqs, getMcqs, addQuestion } from '../controllers/mcqController.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/adminOnly.middleware.js';

const router = express.Router();

router.get('/:chapterId', getMcqs);

router.post('/:standard/:subject/:chapterId', 
  authMiddleware, 
  adminOnly, 
  addMcqs
);

router.put('/:chapterId', 
  authMiddleware, 
  adminOnly, 
  addQuestion
);


export default router; 
