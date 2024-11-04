const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


//add user authentication and authorization
//add input validation using zod
router.get('/hello',(req,res)=>{
    res.send("hello")
})


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email:email
            }
        })
        await prisma.$disconnect();
        if(!user){
            return res.status(400).send({message:"User not found",success:false});
        }
        if(user.password === password){
            res.status(200).send({data:user,message:"Successfully signed in",success:true})
        }else{
            res.status(400).send({message:"Incorrect password",success:false})
        }
    } catch (error) {
        // res.status(400).send({message:"Please try again",success:false})
        res.status(400).send(error.message)   
    }
});

router.post("/signup", async (req, res) => {
    const {username,email,password} = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                email:email,
                username:username,
                password:password
            }
        })
        await prisma.$disconnect();
        res.status(200).send({message:"successfully created user",success:true});
    } catch (error) {
        res.status(400).send({message:"User not created"});
    }
});

router.get('/all', async (req,res)=> {
    try {
        const users = await prisma.user.findMany();
        await prisma.$disconnect();
        res.status(200).send(users);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;
