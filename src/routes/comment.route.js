import { Router } from 'express';
import { deleteComment, getComment, patchComment, postComment } from "../controllers/comment.controller.js"
import authMiddleware from '../../authMiddleware.js';

const router = Router();
router.get('/comments/:numerical_id', getComment);
router.post('/comments:numerical_id/comments', authMiddleware, postComment);
router.patch('/comments:numerical_id/:comment_id' , authMiddleware , patchComment);
router.delete('/comments:numerical_id/:comment_id' , authMiddleware , deleteComment); 

export default router;
