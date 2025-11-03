import { Request, Response } from "express";
import { Post, posts } from "../models/posts-model";

export const getPosts = (req: Request, res: Response) => {
    res.status(200).json({ message: "Post ditemukan", data: posts })
}

export const createPost = (req: Request, res: Response) => {
    const { title, content } = req.body;

    console.log("ini title: ", title)

    const newPost: Post = {
        id: posts.length + 1,
        title,
        content
    }

    posts.push(newPost)
    res.status(201).json({ message: "Berhasil create post", data: posts })
}

export const deletePost = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const cekId = posts.some(post => post.id === id)
    if (!cekId) {
        return res.status(404).json({ message: "Post tidak ditemukan" })
    }

    const updated = posts.filter(post => post.id !== id)
    posts.length = 0
    posts.push(...updated)

    res.status(200).json({ message: "Berhasil delete post", data: posts })
}
