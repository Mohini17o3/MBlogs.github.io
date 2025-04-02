import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const secretKey = process.env.secret || 'yourSecretKey';

export const authUser = async (req , res) => {
    res.json({user : req.user || null} ) ;
}


export const registerUser = async (req, res) => {

    console.log("method invoked");
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists. Please log in." });
    }
        

        const user = await prisma.user.create({ 
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "Registration successful" });

    }
     catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) return res.status(400).send({ message: "Invalid email or password" });

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) return res.status(400).send({ message: "Invalid password" });

        const token = jwt.sign(
            {id: user.id, 
            email: user.email },
            secretKey,
            { expiresIn: '2d' }
        );

        res.status(200).json({ token });
            } 
            
            catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
};
