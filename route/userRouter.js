const express=require("express");
const router=express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const getUsers=async (req,res)=>{   
    //console.log(req.body);
    const users = await prisma.user.findMany()

    res.status(200).json({
        status:"Succssfull",
        Length:users.length,
        Data:users
    })
}

const createUser=async(req,res)=>{
    console.log(req.body);

    const user=await prisma.user.create({
        data:req.body
    })
    res.status(200).json({
        Status:"Succesfull",
        Data:user,
        Message:"User Is created "

    })
}

const identifyUser=async (req,res)=>{

    const users = await prisma.user.findMany();
    const emailExists = users.some(user => user.email === req.body.email);
    const phoneNumberExist= users.some(users => users.phoneNumber ===req.body.phoneNumber)


    if(emailExists){
        console.log("This Emails Exists");
        linkedRecord=await prisma.user.findFirst({
            where:{
                email:req.body.email,
                linkPrecedence:"primary"
            }  
        })
       const body={...req.body};
       body.linkPrecedence="secondary";
       body.linkedId=linkedRecord.id;
        const user =await prisma.user.create({
            data:body
        })
        
        console.log(user);

        res.status(200).json({
            Message:"The record exist and linked with the primary record"
        })
    }else if(phoneNumberExist){
        console.log("this Phone number Exists");

        linkedRecord=await prisma.user.findFirst({
            where:{
                phoneNumber:req.body.phoneNumber,
                linkPrecedence:"primary"
            }  
        })

       const body={...req.body};
       body.linkPrecedence="secondary";
       body.linkedId=linkedRecord.id;
        const user=await prisma.user.create({
            data:body
        })

        res.status(200).json({
            Message:"Record is created and also linked with the primary record"
        })
    }else{
        console.log("record is new one");
        
        const user=await prisma.user.create({
            data:req.body
        })
        res.status(200).json({
            Status:"Succesfull",
            Message:"Users is created Succesfull"
        });

    }
}


router.route("/users").
get(getUsers)
.post(createUser)

router.route("/identify")
.post(identifyUser)


module.exports=router;