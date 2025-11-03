import { Request, Response } from "express";
import { productInterface, products } from "../models/products-model";
import { orderInterface, orders } from "../models/orders-model";

export const getOrders = (req: Request, res: Response) => {
    res.status(200).json({ message: "Post ditemukan", data: orders })
}

export const createOrder = (req: Request, res: Response) => {
    const { idProduct, jumlahOrder } = req.body;

    console.log("ini title: ", idProduct)

    const dataProduct = products.find(product => product.id === idProduct)

    if (!dataProduct) {
        return res.status(404).json({ message: "product tidak ada" })
    }

    console.log("ini data product:", dataProduct)

    const newOrder: orderInterface = {
        id: orders.length + 1,
        idProduct,
        jumlahOrder,
        totalPrice: dataProduct.price * jumlahOrder
    }

    orders.push(newOrder)
    res.status(201).json({ message: "Berhasil create order", data: newOrder })
}

export const deleteOrder = (req: Request, res: Response) => {
    const id = Number(req.params.id)

    console.log("ini id: ", id)

    const index = orders.findIndex(order => order.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Order tidak ditemukan" })
    }

    console.log("ini orders: ", orders)
    console.log("ini index: ", index)

    orders.splice(index, 1)

    res.status(200).json({
        message: "Berhasil delete orders",
        data: orders
    })
}


export const updateOrder = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const data: orderInterface = req.body

    const index = orders.findIndex(product => product.id === id)
    if (index === -1) {
        return res.status(404).json({ message: "Order tidak ditemukan" })
    }

    console.log('ini index: ', index)

    const dataProduct = products.find(product => product.id === data.idProduct)

    if (!dataProduct) {
        return res.status(404).json({ message: "product tidak ada" })
    }

    const updateIdProduct = data.idProduct ?? orders[index].idProduct
    const updateJumlahOrder = data.jumlahOrder ?? orders[index].jumlahOrder
    const updateTotalPrice = dataProduct.price * updateJumlahOrder

    orders[index] = {
        ...orders[index],
        jumlahOrder: updateJumlahOrder,
        idProduct: updateIdProduct,
        totalPrice: updateTotalPrice
    }

    res.json({
        message: "Orders berhasil diperbarui",
        data: orders[index]
    })
}
