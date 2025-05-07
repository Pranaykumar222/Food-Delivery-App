import express from 'express';
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuController.js';
import { authMiddleware,adminMiddleware} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMenu);

router.post('/', authMiddleware, adminMiddleware, addMenuItem);
router.put('/:id', authMiddleware, adminMiddleware, updateMenuItem);
router.delete('/:id', authMiddleware, adminMiddleware, deleteMenuItem);

export default router;