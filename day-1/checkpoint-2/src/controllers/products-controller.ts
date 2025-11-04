import { Request, Response } from "express";
import { productInterface, products } from "../models/products-model";

export const getProducts = (req: Request, res: Response) => {
    res.status(200).json({ message: "Products ditemukan", data: products })
}

export const createProduct = (req: Request, res: Response) => {
    const { productName, price } = req.body;

    console.log("ini title: ", productName)

    const newProduct: productInterface = {
        id: products.length + 1,
        productName,
        price
    }

    products.push(newProduct)
    res.status(201).json({ message: "Berhasil create product", data: newProduct })
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Product tidak ditemukan" })
    }

    console.log("ini products: ", products)
    console.log("ini index: ", index)

    products.splice(index, 1)

    res.status(200).json({
        message: "Berhasil delete product",
        data: products
    })
}


export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: productInterface = req.body

    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Product tidak ditemukan" })
    }

    console.log('ini index: ', index)

    products[index] = {
        ...products[index],
        productName: data.productName ?? products[index].productName,
        price: data.price ?? products[index].price
    }

    res.json({
        message: "Product berhasil diperbarui",
        data: products[index]
    })
}
