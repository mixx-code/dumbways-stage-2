import express from 'express'
import productRoutes from './routes/product'
import orderRoutes from './routes/order'

const app = express()
const PORT = process.env.PORT || 3006

app.use(express.json())
app.use("/api/v3", productRoutes)
app.use("/api/v3", orderRoutes)



app.listen(PORT, () => {
    console.log(`app starting on http://localhost:${PORT}`);
})