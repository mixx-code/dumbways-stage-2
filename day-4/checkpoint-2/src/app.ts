import express from 'express'
import productRoutes from './routes/product'
import supplierRoutes from './routes/supplier'

const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json())
app.use("/api/v3", productRoutes)
app.use("/api/v3", supplierRoutes)


app.listen(PORT, () => {
    console.log(`app starting on http://localhost:${PORT}`);
})