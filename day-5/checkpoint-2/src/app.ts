import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import supplierRoutes from './routes/supplier'

dotenv.config();

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use("/api/v5", userRoutes)
app.use("/api/v5", supplierRoutes)


app.listen(PORT, () => {
    console.log(`app starting on Port ${PORT}`);

})