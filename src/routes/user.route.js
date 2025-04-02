import express from 'express';
import { registerUser, loginUser, authUser } from "../controllers/auth.controller.js"
import authMiddleware from '../../authMiddleware.js';

const router = express.Router();

router.get('/auth/user' , authMiddleware ,  authUser) ;
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
