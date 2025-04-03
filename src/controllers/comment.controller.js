import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComment = async (req, res) => {

    const { numerical_id } = req.params;

    console.log("comments getting for "  , numerical_id);
    
        try { 
            const post = await prisma.post.findFirst({
                where : {numerical_id : parseInt(numerical_id) } , 
                include : {
                    comments : {
                        include : { 
                            user : true , 
                        }
                    }
                }
            }) ;

            if(!post) {
                return res.status(404).json({message : "Post not found"}) ;
            }

            res.json( {comments : post.comments  } ) ; 
        } catch(e) {
            console.log(e) ;
            return res.status(500).json({message : "Internal Server error"}) ;
        }
    }



   export const postComment =  async(req , res )=>{
    const { numerical_id } = req.params;
    const { content} = req.body;
    const user = req.user;
        try {

                
            if (!user) {
                return res.status(404).json({message: "unauthorised user"}) ;
            }
    

            const post = await prisma.post.findFirst({
                where: { numerical_id: parseInt(numerical_id) }
            });
    
           if(!post) {
              return res.status(404).json({message: "post does not exist"}) ;
           }
            // Create comment
         const newComment=  await prisma.comment.create({
                data: {
                    content,
                    postId: post.id,
                    userId: req.user.id 
                }, 
                include: {user : true} , 
            });

            res.status(201).json({comment :newComment});

                    
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: "Server error" });
        }
    }

    export const patchComment = async(req , res) => {
        console.log("path hit");

        const {numerical_id , comment_id} = req.params ;
        const {content} = req.body ; 
        const user = req.user ; 
        
        try {

            if(!user) {
                return res.status(404).json({message : "unauthorised user"}) ;
                 
            }

            const post = await prisma.post.findFirst({
                where : {numerical_id : parseInt(numerical_id)} 
            }) ;

            if(!post) {
                return res.status(404).json({message : "Post does not exist"});
            }
            const comment = await prisma.comment.findFirst({
                where: {
                    id: comment_id,  
                    postId: post.id,
                    userId: user.id
                }
            });

            if(!comment) {
                return res.status(404).json({message : "comment not found or you are not authorised to  edit this comment"}) ; 

            }

            const updatedComment = await prisma.comment.update({
                where : {
                    id : comment.id , 
                } , 
                data : {content} , 
            }) ;

            return res.status(200).json({
                message : "comment updated successfully " , 
                comment  : updatedComment , 
            })


        }catch(e) {
            console.log(e)  ;
            res.status(500).send({message : "Internal server error"}) ; 
            
        }


    }
    
      
    export const deleteComment =  async(req , res)=>{

        const {comment_id } = req.params;
        const user =  req.user;
       
       try {
            
        const comment = await prisma.comment.findUnique({
            where : {
                id :comment_id ,  
            }
        }) ; 

          
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if(comment.userId != user.id) {
            return res.status(400).json({message : "you can't delete this comment"}) ;

        }


        await prisma.comment.delete({
            where : {id : comment_id} 
        })

        res.status(200).json({ message: "Comment deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

