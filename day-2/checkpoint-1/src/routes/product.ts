import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product'

const router = express.Router()

router.get("/products", getProducts)

router.get("/product/:id", getProductById)

router.post("/create-product", createProduct)

router.put("/update-product/:id", updateProduct)

router.delete("/delete-product/:id", deleteProduct)


export default router