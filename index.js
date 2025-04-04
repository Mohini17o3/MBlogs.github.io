import dotenv from 'dotenv';
import express from "express" ;
import bodyParser from "body-parser";
import axios from "axios";
import getRecentPost from './src/controllers/post.controller.js';
import userRoutes from "./src/routes/user.route.js"
import authMiddleware from "./authMiddleware.js";
import commentRoutes from "./src/routes/comment.route.js"
import { loginUser } from "./src/controllers/auth.controller.js";
import { registerUser } from "./src/controllers/auth.controller.js";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const prisma = new PrismaClient();

const app = express();
const port = 3000 ;

// const postRoutes = require("./src/routes/post.route.js").default
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(express.json());

app.post('/login', loginUser);
app.post('/register', registerUser);
    
app.use('/', userRoutes);
app.use('/', commentRoutes);
    
app.use(bodyParser.urlencoded({
    extended: true
}));





app.get('/',getRecentPost, (req, res) => {
    res.render('index');
});


app.get("/home" ,getRecentPost ,(req,res)=>{
    res.render('index.ejs');
})

app.get("/about" , (req , res)=>{
    res.render("about.ejs");
})

app.get("/Logs" ,(req , res)=>{
    res.render("All_Logs.ejs");
})

app.get("/login" ,(req , res)=>{
    res.render("login.ejs" );
})

app.get("/register" ,(req , res)=>{
    res.render("register.ejs");
})


app.get("/contact" , async(req , res)=>{
    const user = req.user || null; 

try{
    const response = await axios.get('https://zenquotes.io/api/quotes/');
    const quotes =  response.data.map(quote=>quote.q) ;
    const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
    res.render('contact.ejs' , {randomQuote , user} );
} catch(error){
    console.error('Error fetching data:' , error);
    res.status(500).send('Error fetching data');
}

});



app.get("/card1" ,  async(req , res)=>{
       try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 1} ,

            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }

       
     res.render("card1.ejs" , { post });
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }

})
app.get("/card2" , async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 2} ,
                 
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }

       
       
     res.render("card2.ejs" , { post });
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})

app.get("/card3" ,async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 3} ,
               
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }


       
     res.render("card3.ejs" , { post });
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})

app.get("/card4" ,async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 4} ,
                  
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }

       
     res.render("card4.ejs" , { post });
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})

app.get("/card5" ,async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 5} ,
                  
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }

       
     res.render("card5.ejs" , {post});
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})

app.get("/card6" ,async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 6} ,
               
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }


       
     res.render("card6.ejs" , { post });
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})
app.get("/card7" ,async(req , res)=>{

    try {
        const post = await prisma.post.findFirst(
            {
                where : {numerical_id: 7} ,
                   
            } , 
        );

        if(!post) {
            return res.status(404).send({message : "Oops post not found"});

        }

       
       
     res.render("card7.ejs" , {post});
    } catch(err){
       console.error(err);
       res.status(500).send({message : "server error"})
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // in main body we want card to display image and title of the blog  
  // but what about add new functionality , we need to figure that out too 


