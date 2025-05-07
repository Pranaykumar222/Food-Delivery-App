import express from 'express';
import { placeOrder, getUserOrders, updateOrderStatus,getAllOrders } from '../controllers/orderController.js';
import { authMiddleware,adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, placeOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/admin', authMiddleware, adminMiddleware, getAllOrders); 
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

export default router;