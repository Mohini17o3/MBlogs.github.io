import jwt from "jsonwebtoken" ;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.secret;
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

//   console.log('Token:', token); 

  if (!token) {
      return next();
  }

  try {
      const decoded = jwt.verify(token, secret);
      req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    //   console.log('User:', req.user); 
      next();
  } catch (err) {
      console.error('Invalid token:', err); 
      next();
  }
};


export default authMiddleware;