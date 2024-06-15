import express from "express" ;
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000 ;
app.set('view engine', 'ejs');

 
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/" , (req , res)=>{
    res.render("index.ejs");
})

app.get("/home" , (req,res)=>{
    res.render('index.ejs');
})

app.get("/about" , (req , res)=>{
    res.render("about.ejs");
})

app.get("/contact" , async(req , res)=>{
try{
    const response = await axios.get('https://type.fit/api/quotes');
    const quotes =  response.data.map(quote=>quote.text) ;
    const randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
    res.render('contact.ejs' , {randomQuote});
} catch(error){
    console.error('Error fetching data:' , error);
    res.status(500).send('Error fetching data');
}

});

app.get("/card1" ,(req , res)=>{
     res.render("card1.ejs");
})
app.get("/card2" ,(req , res)=>{
     res.render("card2.ejs");
})
app.get("/card3" ,(req , res)=>{
    res.render("card3.ejs");
})
app.get("/card4" ,(req , res)=>{
    res.render("card4.ejs");
})
app.get("/card5" ,(req , res)=>{
    res.render("card5.ejs");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // in main body we want card to dispaly image and title of the blog  
  // but what about add new functionality , we need to figure that out too 


