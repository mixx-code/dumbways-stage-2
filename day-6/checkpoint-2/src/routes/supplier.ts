import express from 'express'
import { authenticate } from '../middlewares/auth'
import { createProduct, getProducts } from '../controllers/supplier'
import { handleUploadImageProduct } from '../controllers/uploadImageProduct'
import { handleMulterMiddleware } from '../middlewares/handle-multer'
import limiter from '../middlewares/rate-limiter'

const router = express.Router()

// router.post("/register", handleRegister)
router.post("/product/add", createProduct)
router.get("/suppliers/products", authenticate, getProducts)
router.post("/products/upload-image", handleMulterMiddleware, limiter,authenticate, handleUploadImageProduct)


export default router