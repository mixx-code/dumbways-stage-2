import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, //1 menit
    limit: 3,
    message: "terlalu banyak melakukan request",
})

export default limiter