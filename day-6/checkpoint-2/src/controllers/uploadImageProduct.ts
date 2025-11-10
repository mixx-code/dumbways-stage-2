import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { verifyToken } from "../utils/jwt";


export const handleUploadImageProduct = async (req: Request, res: Response) => {
    try {
        const {productId} = req.body;

        // Validasi ID product
        if (!productId) {
            return res.status(400).json({ message: "product ID is required" });
        }

        // Cek apakah file diupload
        const file = (req as any).file;
        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const imageProduct: string = file.filename;
        console.log('Uploaded imageProduct picture:', imageProduct);

        // Cek apakah product exists
        const existingProduct = await prisma.product.findUnique({
            where: { id: parseInt(productId)}
        });

        if (!existingProduct) {
            return res.status(404).json({ message: "product not found" });
        }

        // Update imageProduct picture product
        const uploadImageProduct = await prisma.imageProduct.create({
            data:{
                imageProduct,
                productId:parseInt(productId)
            }
        });

        return res.status(200).json({
            message: "imageProduct picture updated successfully",
            data: uploadImageProduct
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "product not found"
            });
        }
        
        console.error("Error updating imageProduct picture:", error);
        return res.status(500).json({
            message: "Failed to update imageProduct picture",
            error: error.message
        });
    }
};