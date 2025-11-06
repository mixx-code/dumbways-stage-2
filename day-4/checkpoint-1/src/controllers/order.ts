import { Request, Response } from "express";
import { prisma } from "../prisma/client";


export const getOrdersSummary = async (req: Request, res: Response) => {
    const {
        sortBy,
        order,
        limit,
        offset
    } = req.query

    const itemPerPage:number = Number(limit) || 10
    const pageNumber:number =  Number(offset) || 1

    const skipValue:number = Number((pageNumber -1) * itemPerPage)

    const orderParam: 'asc' | 'desc' = order === 'desc' ? 'desc' : 'asc'

    console.log("ini limit: ", limit);
    console.log("ini offset: ", offset);
    console.log("ini order: ", order);
    console.log("ini sortBy: ", sortBy);
    console.log("ini skipValue: ", skipValue);

    try {
        const orders = await prisma.order.groupBy({
            by: ['userId'],
            _count: { _all: true },
            _sum: { qty: true },
            orderBy: {
                userId: orderParam
            },
            take: itemPerPage,
            skip: skipValue,
        })

        const data = orders.map(o => ({
            userId: o.userId,
            totalOrder: o._count._all,
            totalQty: o._sum.qty,
        }))

        res.status(200).json({
            message: "success get data order summary",
            data: data,
            pagination:{
                itemPerPage,
                pageNumber
            },
            total: orders.length
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}