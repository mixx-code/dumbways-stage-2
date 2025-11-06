import { prisma } from "../prisma/client";

export const middlewareTransferPoints = async (req: any, res: any, next: any) => {
    try {
    const { points, senderId, receiverId } = req.body
    const amount = Number(points)

    //cek dulu amount tidak boleh negatif 
    if(amount < 0) throw {status: 400, message: "points tidak boleh dibawah 0"}

    //cek dulu apakah  sender dan receiver ada di database
    const [sender, receiver] = await Promise.all([
        prisma.user.findUnique({ where: { id: Number(senderId) } }),
        prisma.user.findUnique({ where: { id: Number(receiverId) } })
    ])

    if (sender === null) throw {status: 404, message: "senderId tidak ditemukan"}
    if (receiver === null) throw {status: 404, message: "receiverId tidak ditemukan"}

    //cek dulu points sender tidak boleh kurang dari amount 
    if (sender.points < amount) throw {status: 400, message: "points tidak mencukupi"}

    next();
    } catch (error:any) {

        // ini error handling
        console.error(error);
        
        const statusCode = error.status || 500;
        const message = error.message || 'Terjadi kesalahan pada server.';
        res.status(statusCode).json({ message });
    }
};