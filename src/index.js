const { PrismaClient } = require("@prisma/client");
const express = require("express");

const prisma = new PrismaClient(); // Instantiate the Prisma Client


// const presentation = prisma.presentation;
const app = express();
const port = 5000;

app.use(express.json());

app.get("/" , (req,res)=>{
    return res.json({message:"Welcome to Prisma API"}).status(200);
});
app.get("/ping" , (req,res)=>{
     const count = prisma.presentation.findMany();

    return res.json({message:"pong" , count}).status(200);
});

app.listen(port,()=>{
    console.log(`App Running on Port ${port}`);
});