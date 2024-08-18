import { Router } from "express";
const router = Router();

import  getRecentPost  from "../controllers/post.controller.js";

router.get('/' , getRecentPost);

export default router;
