import express from 'express'
const router = express.Router()
import { 
    getProducts, 
    getProductById,
    getProductByCategory,
    createProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct)
router.route('/category/:gender').get(getProductByCategory)

export default router
