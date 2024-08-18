import { PrismaClient } from "@prisma/client";

const prisma =  new PrismaClient();

const getRecentPost = async (req , res)=>{
    try{
        const posts =  await prisma.post.findMany({
           orderBy  : {createdAt: 'asc'} ,
           take : 3
     
        });
     res.render('index' , {posts , user: req.user || null}) ;

    } catch(err){
        console.error(err);
        res.status(500).send({message :"server error"});

    }
} ;

export default getRecentPost;

