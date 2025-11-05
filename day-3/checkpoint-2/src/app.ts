import express from 'express'
import postRoutes from './routes/post'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/api/v3", postRoutes)



app.listen(PORT, () => {
    console.log(`app starting on http://localhost:${PORT}`);
})