import express from 'express'
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/post'

const router = express.Router()


router.get("/posts", getPosts)
router.get("/post/:id", getPostById)

router.post("/create-post", createPost)
router.put("/update-post/:id", updatePost)
router.delete("/delete-post/:id", deletePost)

export default router