import { Request, Response } from "express";
import { prisma } from "../prisma/client";

export const transferPoints = async (req: Request, res: Response) => {
    const {points, senderId, receiverId} = req.body
    const amount = Number(points)

    try {
        // if(amount < 0) throw {status: 400, message: "points tidak boleh dibawah 0"}
        // const [sender, receiver] = await Promise.all([
        //     prisma.user.findUnique({ where: { id: Number(senderId) } }),
        //     prisma.user.findUnique({ where: { id: Number(receiverId) } })
        // ])

        // if (sender === null) throw {status: 404, message: "senderId tidak ditemukan"}
        // if (receiver === null) throw {status: 404, message: "receiverId tidak ditemukan"}

        // if (sender.points < amount) throw {status: 400, message: "points tidak mencukupi"}

        // console.log(sender)
        // console.log(receiver)

        await prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: {id: senderId},
                data:{
                    points: {
                        decrement: amount
                    }
                }
            })
            await tx.user.update({
                where:{id: receiverId},
                data:{
                    points: {
                        increment: amount
                    }
                }
            })
        })
        
        res.status(200).json({message: "transfer points success"})


    } catch (error) {
        console.error(error);
        res.json({message: "transfer points field", error: error})
    }


}