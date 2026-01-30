import express from 'express';
import { adminOnly } from '../middleware/adminOnly.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { 
  getCatalogue, 
  addStandard, 
  addNewSubject, 
  deleteSubject, 
  deleteStandard ,
  addChapter,
  deleteChapter
} from '../controllers/catalogueController.js';


const router = express.Router();

router.get('/', getCatalogue);

router.post('/standard', 
  authMiddleware, 
  adminOnly, 
  addStandard
);

router.delete('/:standard',
  authMiddleware, 
  adminOnly, 
  deleteStandard
);

router.post('/:standard/subject', 
  authMiddleware, 
  adminOnly, 
  addNewSubject
);

router.delete('/:standard/:subject', 
  authMiddleware, 
  adminOnly, 
  deleteSubject
);

router.put('/:standard/:subject/:chapter', 
  authMiddleware, 
  adminOnly, 
  addChapter
);

router.delete('/:standard/:subject/:chapter',  
  authMiddleware, 
  adminOnly, 
  deleteChapter
);

export default router;
