import express from 'express'
import { getProducts } from '../controllers/product'

const router = express.Router()

router.get("/products", getProducts)

export default router