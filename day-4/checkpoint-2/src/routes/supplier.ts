import express from 'express'
import { updateStoke } from '../controllers/supplier'
import { middlewareUpdateStoke } from '../middlewares/update-stock'

const router = express.Router()

router.post("/supplier-stock", middlewareUpdateStoke, updateStoke)

export default router