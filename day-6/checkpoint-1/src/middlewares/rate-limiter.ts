import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 menit
    limit: 3,
    message: "terlalu banyak melakukan request",
})

export default limiter