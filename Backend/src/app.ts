import express from "express";
import cors from 'cors'
import browseRouter from './routes/browse.route.js'

const app = express();

app.use(cors())
app.use(express.json());
app.use("/public", express.static("public"))
app.use('/browse', browseRouter)


export default app;