import express from "express";
import 'dotenv/config';
import authRoutes from "./routes/authRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import { connectDB } from "./lib/db.js";
import job from "./lib/cron.js";
const PORT = process.env.PORT || 3000;
const app = express();

job.start();
app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json({ message: 'Movie Recommender API is running!' });
});

app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);        
app.use("/api/movies",movieRoutes);

app.listen(PORT,()=>
{
    console.log(`application is running on ${PORT}`);
    connectDB();
})
