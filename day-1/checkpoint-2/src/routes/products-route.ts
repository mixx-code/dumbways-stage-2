import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products-controller";

const router = express.Router()

router.get("/products", getProducts)

router.post("/create-product", createProduct)

router.delete("/delete-product/:id", deleteProduct)

router.put("/update-product/:id", updateProduct)

export default router;