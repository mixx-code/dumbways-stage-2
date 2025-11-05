import express from 'express'
import { getCommentOnPost, getCommentSummary, getPosts } from '../controllers/post'

const router = express.Router()

router.get("/posts", getPosts)
router.get("/posts/:id/comments", getCommentOnPost)
router.get("/posts/comments-summary", getCommentSummary)

export default router