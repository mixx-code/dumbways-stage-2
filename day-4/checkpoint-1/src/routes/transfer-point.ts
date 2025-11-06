import express from 'express'
import { transferPoints } from '../controllers/transfer-point'
import { middlewareTransferPoints } from '../middlewares/transfer-point'

const router = express.Router()

router.post("/transfer-points", middlewareTransferPoints, transferPoints)

export default router