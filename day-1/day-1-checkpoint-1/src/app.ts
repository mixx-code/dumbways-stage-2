import express from "express";
import postsRoutes from "./routes/posts-route"

const app = express()
const PORT = 3000

app.use(express.json());
app.use("/api/v1", postsRoutes)


app.listen(PORT, ()=> {
    console.log("app starting");
    
})