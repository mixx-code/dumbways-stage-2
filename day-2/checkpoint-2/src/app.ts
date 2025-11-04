import expreess from 'express';
import userRoutes from './routes/user'
import postRoutes from './routes/post'

const app = expreess()

app.use(expreess.json())
const PORT = process.env.PORT || 3000


app.use("/api/v2", userRoutes)
app.use("/api/v2", postRoutes)


app.listen(PORT, () => {
    console.log(`app starting http://localhost:${PORT}`)
})