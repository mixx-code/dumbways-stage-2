import express from 'express'
import { authenticate } from '../middlewares/auth'
import { createProduct, getProducts } from '../controllers/supplier'

const router = express.Router()

// router.post("/register", handleRegister)
router.post("/product/add", createProduct)
router.get("/suppliers/products", authenticate, getProducts)


export default router