import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const comment = async (req, res) => {
    const { numerical_id } = req.params;
    const { content } = req.body;
    const user = req.user;
    try {

        const post = await prisma.post.findFirst({
            where: { numerical_id: parseInt(numerical_id) }
        });


        if (!user) {
            return res.status(404);
        }

        // Create  comment
        await prisma.comment.create({
            data: {
                content,
                postId: post.id,
                userId: req.user?.id 
            }
        });

        // Fetch the updated post with comments
        const updatedPost = await prisma.post.findUnique({
            where: { id: post.id },
            include: { comments: true },
        });

        res.render(`card${numerical_id}`, { user: req.user || null , post: updatedPost  });
                
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Server error" });
    }
};

export default comment;
