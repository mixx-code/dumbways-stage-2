import express from 'express'
import { getUser, handleLogin, handleRegister } from '../controllers/user'
import { authenticate } from '../middlewares/auth'

const router = express.Router()

router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.get("/users", authenticate, getUser)


export default router