import Joi from "joi";

export interface User {
    name: string;
    email: string;
    password: string;
    role: string;
    profile: string
}

export interface userLogin {

}

export const registerSchema = Joi.object<User>({
    name: Joi.string().min(2).max(50).required().messages({
        "string.min": "minimal nama harus 2 karakter",
        "string.max": "maksimal nama 50 karakter",
        "any.required": "nama harus diisi",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "masukan email yang valid",
        "any.required": "email harus diisi"
    }),
    password: Joi.string().min(6).max(12).required().messages({
        "string.min": "minimal password harus 6 karakter",
        "string.max": "maksimal password 12 karakter",
        "any.required": "password harus diisi",
    }),
    role: Joi.string()
});


export const loginSchema = Joi.object<User>({
    email: Joi.string().email().required().messages({
        "string.email": "masukan email yang valid",
        "any.required": "email harus diisi"
    }),
    password: Joi.string().min(6).max(12).required().messages({
        "string.min": "minimal password harus 6 karakter",
        "string.max": "maksimal password 12 karakter",
        "any.required": "password harus diisi",
    })
});
