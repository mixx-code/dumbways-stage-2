import multer from "multer";
import path from "path"


const storage = multer.diskStorage({
    destination: 'src/uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) =>{
        const tipeFileYgBoleh = [
            'image/jpeg',
            'image/jpg', 
            'image/png',
            'image/webp',
        ]
        if(tipeFileYgBoleh.includes(file.mimetype)){
            cb(null, true)
        } else {
            cb(new Error('file yang diizinkan hanya jpeg, jpg, png, webp'))
        }
    },
    limits: {
        fileSize: 0.5 * 1024 * 1024,
    }
})