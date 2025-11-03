import express from "express";
import productRoutes from "./routes/products-route"
import orderRoutes from "./routes/orders-route"

const app = express()
const PORT = 3000

app.use(express.json());

app.use("/api/v1", productRoutes)
app.use("/api/v1", orderRoutes)

app.listen(PORT, () => {
    console.log("app starting");

})