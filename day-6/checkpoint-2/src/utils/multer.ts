import multer from 'multer'

const storage = multer.diskStorage({
    destination: 'src/uploads',
    filename: (req, file, cb) => {
        cb(null, `image-product-${Date.now()}`)
    }
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb)=>{
        const tipeFileYangDiterima = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/wepg',
        ]
        if (tipeFileYangDiterima.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('file yang diizinkan hanya jpeg, jpg, png, webp'))
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
})