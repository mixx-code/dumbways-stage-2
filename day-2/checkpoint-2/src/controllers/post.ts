import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getPosts = async (req:Request, res:Response) => {
    try {
        const posts = await prisma.post.findMany()
        if (posts.length === 0) {
            return res.status(404).json({
                message: "data posts empty",
                data: posts
            })
        }

        return res.status(200).json({
            message: "success get data posts",
            data: posts
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const getPostById = async (req:Request, res:Response) => {
    try {
        const idParam = parseInt(req.params.id)
        const post = await prisma.post.findUnique({
            where:{
                id: idParam
            }
        })
        
        if (post === null) {
            return res.status(404).json({
                message: "data post not found"
            })
        }
        return res.status(200).json({
            message: "success get data post by id",
            data: post
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const createPost = async (req:Request, res:Response) => {
    const {authorId, title, content} = req.body
    try {
        const createPost = await prisma.post.create({
            data: {
                title,
                content,
                author: { connect: { id: Number(authorId) } }
            },
            include:{
                author: {select: {id: true, name: true, email: true, posts: true}}
            }
        })

        return res.status(201).json({
            message: "success create data post",
            data: createPost
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const updatePost = async (req:Request, res:Response) => {
    const {authorId, title, content} = req.body
    const idParam = parseInt(req.params.id)
    try {
        const updatePost = await prisma.post.update({
            where:{
                id: idParam
            },
            data: {
                title,
                content,
                author: { connect: { id: Number(authorId) } }
            },
            include:{
                author: {select: {id: true, name: true, email: true, posts: true}}
            }
        })

        return res.status(201).json({
            message: "success create data post",
            data: updatePost
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}
export const deletePost = async (req:Request, res:Response) => {
    const idParam = parseInt(req.params.id)
    try {
        const deletePost = await prisma.post.delete({
            where:{
                id: idParam
            }
        })

        return res.status(201).json({
            message: "success delete data post",
            data: deletePost
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}