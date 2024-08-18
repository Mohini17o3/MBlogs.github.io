import { Router } from 'express';
import comment from "../controllers/comment.controller.js"
import authMiddleware from '../../authMiddleware.js';

const router = Router();
router.post('/card:numerical_id', authMiddleware, comment);


export default router;
