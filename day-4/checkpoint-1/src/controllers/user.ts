import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const getUserById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const dataUserById = await prisma.user.findUnique({
            where:{
                id: id
            }
        })
        res.status(200).json({message: "success get user by id", data: dataUserById})

    } catch (error) {
        console.error(error);
        res.json({message: "field get user by id", error: error})
    }


}