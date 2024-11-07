const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middlewares/authmiddleware");

const prisma = new PrismaClient();

//add user authentication and authorization
//add input validation using zod
router.get("/hello", (req, res) => {
  res.send("hello");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    await prisma.$disconnect();
    if (!user) {
      return res
        .status(400)
        .send({ message: "User not found", success: false });
    }
    if (user.password === password) {
      const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
      res.cookie("token", token, { expiresIn: "2h" });
      res
        .status(200)
        .send({
          message: "Successfully logged in",
          success: true,
          userId: user.id,
        });
    } else {
      res.status(400).send({ message: "Incorrect password", success: false });
    }
  } catch (error) {
    // res.status(400).send({message:"Please try again",success:false})
    res.status(400).send("helo");
  }
});

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
      },
    });
    await prisma.$disconnect();
    res
      .status(200)
      .send({ message: "successfully created user", success: true });
  } catch (error) {
    res.status(400).send({ message: "User not created" });
  }
});

router.get("/logout", async (req, res) => {
  res.cookie("token", "");
  res.send({ message: "Logged out", success: true });
});
router.get("/all", authmiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    res.status(200).send(users);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/messages/set", authmiddleware, async (req, res) => {
  const { userId, receiverId, data } = req.body;
  try {
    await prisma.message.create({
      data: {
        senderId: Number(userId),
        receiverId: Number(receiverId),
        content: data,
      },
    });
    await prisma.$disconnect();
    res.status(200).send({ message: "Successfully sent", success: true });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.post("/messages/get", authmiddleware, async (req, res) => {
  const { userId, receiverId } = req.body;
  try {
    const message = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: Number(userId), receiverId: Number(receiverId) },
          { senderId: Number(receiverId), receiverId: Number(userId) },
        ],
      },
      orderBy: {
        timestamp: "asc",
      },include:{
        sender:true,
      }
    });
    res.send({ message: message, success: true });
  } catch (error) {
    res.status(401).send({ message: "Error", success: false });
  }
});

module.exports = router;
