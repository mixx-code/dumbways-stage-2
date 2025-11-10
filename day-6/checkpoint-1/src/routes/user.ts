import express from 'express'
import { getUser, handleLogin, handleRegister, handleUploadProfilePicture } from '../controllers/user'
import { authenticate } from '../middlewares/auth'
import { upload } from '../utils/multer'
import limiter from '../middlewares/rate-limiter'
import { corsMiddleware } from '../middlewares/cors'
import { handleMulterMiddleware } from '../middlewares/handle-multer'

const router = express.Router()
router.post("/register", handleRegister)
router.post("/login", handleLogin)
router.post("/upload-profile-picture", authenticate, handleMulterMiddleware, limiter, handleUploadProfilePicture)
router.get("/users", corsMiddleware, limiter, authenticate, getUser)


export default router