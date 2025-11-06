import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const updateStoke = async (req: Request, res: Response) => {
    const dataUpdateStock: { supplierId: number; productId: number; stockAmount: number }[] = req.body;

    try {
        const result = await prisma.$transaction(async (tx) => {
            const updateResults = [];

            for (const data of dataUpdateStock) {
                const updatedStock = await tx.stock.upsert({
                    where: { productId: data.productId },
                    update: {
                        stockAmount: {
                            increment: data.stockAmount
                        }
                    },
                    create: {
                        productId: data.productId,
                        stockAmount: data.stockAmount
                    }
                });

                updateResults.push({
                    productId: data.productId,
                    supplierId: data.supplierId,
                    newStock: updatedStock.stockAmount,
                    status: 'success'
                });
            }

            return updateResults;
        });

        res.status(200).json({
            message: 'Update stok berhasil',
            data: result
        });

    } catch (error: any) {
        res.status(400).json({
            message: 'Update stok gagal',
            error: error
        });
    }
};