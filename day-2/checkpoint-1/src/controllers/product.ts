import { prisma } from '../connection/client'
import { Request, Response } from 'express'
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        if (products.length === 0) {
            return res.status(200).json({
                message: "data products empty",
                data: []
            })
        }
        return res.status(200).json({
            message: "success get data products",
            data: products
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}


export const getProductById = async (req: Request, res: Response) => {
    try {
        const idParam = parseInt(req.params.id)
        const product = await prisma.product.findUnique({
            where: {
                id: idParam
            }
        })
        if (product === null) {
            return res.status(404).json({
                message: "data product not found",
                data: []
            })
        }
        return res.status(200).json({ 
            message: `success get data product by id : ${idParam}`, 
            data: product 
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price } = req.body;
        const createProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price)
            }
        })
        return res.status(201).json({ 
            message: "success create data product", 
            data: createProduct 
        })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const idParam = parseInt(req.params.id)
        const { name, price } = req.body;
        const updateProduct = await prisma.product.update({
            where: {
                id: idParam
            },
            data: {
                name,
                price: parseFloat(price)
            }
        })
        
        return res.status(201).json({ 
            message: "success update data product", 
            data: updateProduct 
        })
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "data product not found"
            })
        }

        return res.status(500).json({ message: error })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const idParam = parseInt(req.params.id)
        const deleteProduct = await prisma.product.delete({
            where: {
                id: idParam
            }
        })
        return res.status(200).json({ 
            message: "success deleted data product", 
            data: deleteProduct 
        })
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "data product not found"
            })
        }
        return res.status(500).json({ message: error })
    }
}