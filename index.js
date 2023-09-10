/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
//1
import  express  from "express";
import path from "path"
import inquirer from "inquirer";
import qr from "qr-image";
import fs, { writeFile } from "fs";
import bodyParser from "body-parser";
const app = express();

app.set('view engine', 'ejs');
app.set('view options', {
  layout: false
});
const __dirname = path.resolve();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

let c=0;
let imageN=""
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
  
})

app.post("/",function(req,res){
  const url=req.body.URL;
  const n=req.body.urlname;
 // const imgurl=req.body.shorturlname;

   
  //  const addr="public/images/"+imgurl+".png";
  //  addr.toString();
  //  console.log(addr)
  var qr_svg = qr.image(url);
  const add='public/images/'+n+'.png'
 
  qr_svg.pipe(fs.createWriteStream(add));

    fs.writeFile("URL.txt",url,(err)=>{
        if(err) throw err;
        console.log("This file has been saved.")
    });
    res.render("index.ejs",{imageName:n})
})




  //2

  app.listen(3000,function(){
    console.log("Server started on port 3000");
  })