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
    res.status(201).json({ message: "Berhasil create post", data: newPost })
}

export const deletePost = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const index = posts.findIndex(post => post.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Post tidak ditemukan" })
    }

    console.log("ini posts: ", posts)
    console.log("ini index: ", index)

    posts.splice(index, 1)

    res.status(200).json({
        message: "Berhasil delete post",
        data: posts
    })
}


export const updatePost = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: Post = req.body

    const index = posts.findIndex(post => post.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Post tidak ditemukan" })
    }

    console.log('ini index: ', index)

    posts[index] = {
        ...posts[index],
        title: data.title ?? posts[index].title,
        content: data.content ?? posts[index].content
    }

    res.json({
        message: "Post berhasil diperbarui",
        data: posts[index]
    })
}
