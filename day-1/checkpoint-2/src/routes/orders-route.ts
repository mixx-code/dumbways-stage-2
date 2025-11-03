import express from "express";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../controllers/orders-controller";


const router = express.Router()

router.get("/orders", getOrders)

router.post("/create-order", createOrder)

router.delete("/delete-order/:id", deleteOrder)

router.put("/update-order/:id", updateOrder)

export default router;