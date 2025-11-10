import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import supplierRoutes from './routes/supplier'
import path from "path"
import cookieParser  from 'cookie-parser'

dotenv.config();

const app = express()
app.use(cookieParser())
const PORT = process.env.PORT

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))

app.use("/api/v6", userRoutes)
app.use("/api/v6", supplierRoutes)


app.listen(PORT, () => {
    console.log(`app starting on Port ${PORT}`);

})