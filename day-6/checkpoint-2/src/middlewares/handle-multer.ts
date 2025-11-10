import { Request, Response, NextFunction } from "express";
import { upload } from "../utils/multer";
import multer from "multer";
export const handleMulterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload.single('imageProduct')(req, res, (err:any) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    return res.status(400).json({
                        message: 'File terlalu besar. Maksimal 5 MB'
                    });
                }
            }
            return res.status(400).json({
                message: err.message
            });
        }
        next();
    })
}