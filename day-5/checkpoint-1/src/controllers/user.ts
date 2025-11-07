import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { loginSchema, registerSchema, User } from "../validation/auth";
import { prisma } from "../prisma/client";
import { signToken, verifyToken } from "../utils/jwt";
import { any } from "joi";

const hashPassword = (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

const comparePassword = (passwrod: string, hashPass: string) => {
    return bcrypt.compare(passwrod, hashPass);
}


export const handleRegister = async (req: Request, res: Response) => {
    try {
        const { error } = registerSchema.validate(req.body)
        if (error) return res.status(400).json({ message: error.message })

        const { name, email, password, role }: User = req.body

        const passhash = await hashPassword(password)

        const createUser = await prisma.user.create({
            data: {
                name,
                email,
                password: passhash,
                role
            },
        })

        return res.status(200).json({
            message: "success created data user",
            data: createUser
        })

    } catch (error) {
        if (error.code === "P2002") {
            return res.status(400).json({
                message: "email sudah dipakai"
            })
        }
        return res.status(500).json({
            message: "field created data user",
            error: error
        })

    }

}



export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { error } = loginSchema.validate(req.body)
        if (error) return res.status(400).json({ message: error.message })

        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) return res.status(404).json({ message: "Email tidak ditemukan" })

        const cekPassword = await comparePassword(password, user.password)

        if (!cekPassword) return res.status(404).json({ message: "Email atau password salah" })

        const token = signToken({
            id: user.id,
            role: user.role
        })

        return res.status(200).json({
            message: "Login berhasil",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "field created data user",
            error: error
        })
    }
}


export const getUser = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]
        const decodedToken = verifyToken(token)

        console.log("token di controller: ", token)
        console.log("decoded di controller: ", decodedToken)
        if (decodedToken.role !== 'admin') {
            return res.status(401).json({ message: "role anda tidak dapat mengakses ini" })
        }
        const dataUser = await prisma.user.findMany()
        if (!dataUser) return res.status(400).json({ message: "data user kosong", data: dataUser })

        return res.status(200).json({
            message: "success get data users",
            data: dataUser
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error
        })
    }
}