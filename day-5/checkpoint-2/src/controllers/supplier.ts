import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { verifyToken } from "../utils/jwt";
import { Product, productSchema } from "../validation/supplier";



export const createProduct = async (req: Request, res: Response) => {
    try {
        const { error } = productSchema.validate(req.body)
        if (error) return res.status(400).json({ message: error.message })

        const token = req.headers.authorization?.split(" ")[1]
        const decodedToken = verifyToken(token)

        console.log("token di controller: ", token)
        console.log("decoded di controller: ", decodedToken)
        if (decodedToken.role !== 'supplier') {
            return res.status(401).json({ message: "anda bukan supplier, tidak dapat add product" })
        }

        const { productName, harga }: Product = req.body

        const addproduct = await prisma.product.create({
            data: {
                productName,
                harga,
                userId : decodedToken.id
            }
        })

        return res.status(200).json({
            message: "success add data product",
            data: addproduct
        })

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({
                message: `id data user tidak ditemukan`
            });
        }
        return res.status(500).json({
            message: "server error",
            error: error
        })
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const decodedToken = verifyToken(token)

        console.log("token di controller: ", token)
        console.log("decoded di controller: ", decodedToken)
        if (decodedToken.role === 'user') {
            return res.status(401).json({ message: "role anda tidak dapat mengakses ini" })
        }
        const dataProducts = await prisma.product.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })
        if (!dataProducts) return res.status(400).json({ message: "data products kosong", data: dataProducts })

        return res.status(200).json({
            message: "success get data products",
            data: dataProducts
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error
        })
    }
}