import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getUsers = async (req:Request, res:Response) => {
    try {
        const users = await prisma.user.findMany()
        if (users.length === 0) {
            return res.status(404).json({
                message: "data users empty",
                data: users
            })
        }

        return res.status(200).json({
            message: "success get data users",
            data: users
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const getUserById = async (req:Request, res:Response) => {
    try {
        const idParam = parseInt(req.params.id)
        const user = await prisma.user.findUnique({
            where:{
                id: idParam
            }
        })
        
        if (user === null) {
            return res.status(404).json({
                message: "data user not found"
            })
        }
        return res.status(200).json({
            message: "success get data user by id",
            data: user
        })
    } catch (error:any) {
        res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const createUsers = async (req:Request, res:Response) => {
    const {name, email} = req.body
    try {
        const createUser = await prisma.user.create({
            data: {
                name,
                email
            }
        })

        return res.status(201).json({
            message: "success create data user",
            data: createUser
        })
    } catch (error:any) {
        return res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}


export const updateUsers = async (req:Request, res:Response) => {
    const {name, email} = req.body
    const idParam = parseInt(req.params.id)
    try {
        const updateUser = await prisma.user.update({
            where:{
                id: idParam
            },
            data: {
                name,
                email
            }
        })

        return res.status(201).json({
            message: "success update data user",
            data: updateUser
        })
    } catch (error:any) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "data users not found"
            })
        }

        return res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}

export const deleteUsers = async (req:Request, res:Response) => {
    const idParam = parseInt(req.params.id)
    try {
        const deleteUser = await prisma.user.delete({
            where:{
                id: idParam
            }
        })

        return res.status(201).json({
            message: "success delete data user",
            data: deleteUser
        })
    } catch (error:any) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "data users not found"
            })
        }

        return res.status(500).json({
            message: `Error Server : ${error}`
        })
    }
}