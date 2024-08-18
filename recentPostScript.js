import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const recentPostScript = async () =>{
    try {

        const newPost = await prisma.post.create({
            data : {
                title: 'Grateful 👀', 
                createdAt : new Date(),
                imageUrl: '/card4.jpg',
                numerical_id : 4 ,
            }
        });

        console.log("post is saved " , newPost);
    } catch(error){
        console.error('error saving post' , error);
    }finally {
        await prisma.$disconnect();
    }
};


recentPostScript();