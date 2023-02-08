import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrderByid,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToCancelled,
  getMyOrders,
  getOrders,
  deleteOrder,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router
  .route('/:id')
  .get(protect, getOrderByid)
  .delete(protect, admin, deleteOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/cancell').put(protect, admin, updateOrderToCancelled)

export default router
