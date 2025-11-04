import express from 'express'
import { createUsers, deleteUsers, getUserById, getUsers, updateUsers } from '../controllers/user'

const router = express.Router()


router.get("/users", getUsers)
router.get("/user/:id", getUserById)

router.post("/create-user", createUsers)
router.put("/update-user/:id", updateUsers)
router.delete("/delete-user/:id", deleteUsers)

export default router