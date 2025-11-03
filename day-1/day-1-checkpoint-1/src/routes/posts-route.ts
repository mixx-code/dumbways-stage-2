import express from "express";
import { createPost, deletePost, getPosts } from "../controllers/posts-controller";

const router = express.Router()

router.get("/posts", getPosts)

router.post("/create-post", createPost)

router.delete("/delete-post/:id", deletePost)

export default router;