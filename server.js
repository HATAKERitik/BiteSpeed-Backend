
const userRouter = require("./route/userRouter");
const express =require("express");
const sqlite3=require("sqlite3")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const app=express();
const port =3000;


app.use(express.json());
app.use("/api", userRouter); 


app.listen(port,()=>{
    console.log("Sever is connect to ",port)
})




