import express from "express";
import 'dotenv/config';
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import { connectDB } from "./lib/db.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use("/api/auth", authRoutes);
app.use("/api/movies",movieRoutes);

app.listen(PORT,()=>
{
    console.log(`application is running on ${PORT}`);
    connectDB();
})
