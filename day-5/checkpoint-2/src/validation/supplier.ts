import Joi, { number } from "joi";

export interface Product {
    productName: string
    harga: number
    userId: number
}


export const productSchema = Joi.object<Product>({
    productName: Joi.string().min(3).required().messages({
        "string.min": "minimal nama harus 2 karakter",
        "any.required": "nama harus diisi",
    }),
    harga: Joi.number().positive().required().messages({
        "number.positive": "harga tidak boleh negatif",
        "any.required": "harga harus diisi",
    }),
    userId: Joi.number().required().messages({
        "any.required": "userId harus diisi",
    }),
});

