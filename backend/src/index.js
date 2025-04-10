import express from "express";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const app = express();


app.listen(3000,()=>
{
    console.log(`application is running on ${PORT}`);
})
