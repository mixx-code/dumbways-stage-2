import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/posts-controller";

const router = express.Router()

router.get("/posts", getPosts)

router.post("/create-post", createPost)

router.delete("/delete-post/:id", deletePost)

router.put("/update-post/:id", updatePost)

export default router;