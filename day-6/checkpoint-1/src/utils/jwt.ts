import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export interface UserPayload {
    id: number,
    role: string
}

export function signToken(payload: UserPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as UserPayload
}
