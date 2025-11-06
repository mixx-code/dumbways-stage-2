import { prisma } from "../prisma/client";

export const middlewareUpdateStoke = async (req: any, res: any, next: any) => {
    const dataUpdateStock: { supplierId: number; productId: number; stockAmount: number }[] = req.body;

    try {
        for (const data of dataUpdateStock) {
            const supplier = await prisma.supplier.findUnique({
                where: { id: data.supplierId }
            });

            if (!supplier) throw { status: 404, message: "supplier tidak dapat ditemukan" }

            const product = await prisma.product.findUnique({
                where: { id: data.productId },
                include: { stock: true }
            });

            if (!product) throw { status: 404, message: "product tidak dapat ditemukan" }

            if (data.stockAmount < 0) throw { status: 400, message: "stockAmount tidak boleh kurang dari 0" }
        }
        next()
    } catch (error: any) {
        console.error(error);
        
        const statusCode = error.status || 500;
        const message = error.message || 'Terjadi kesalahan pada server.';
        res.status(statusCode).json({ message });
    }
};