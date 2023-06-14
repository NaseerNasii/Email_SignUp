const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/public/signup.html");
})


app.post("/",function(req,res){
    const Fname=(req.body.fname);
    const Lname=(req.body.lname);
    const email=req.body.email;
    
    const data={

      members:[
        {
           email_address:email,
           status:"subscribed",
           merge_fields:{
            FNAME:Fname,
            LNAME:Lname
           }
        }
    ]

     };

   const jsondata=JSON.stringify(data);
   
   const url="https://us21.api.mailchimp.com/3.0/lists/51a8d80f9f";
   const options={
    methods:"POST",
    auth:"Naseer:cd360e0c10bbf49061c665a05db8861f-us21"
   }


   const reques=https.request(url,options,function(response){

    if(response.statusCode===200){
        res.sendFile(__dirname+"/public/success.html");
        app.post("/success",function(req,res){
            res.redirect("/");
        })
    }else{
        res.sendFile(__dirname+"/public/failiure.html");
        app.post("/failiure",function(req,res){
            res.redirect("/");
        })
    }       
    response.on("data",function(data){
        //console.log(JSON.parse(data));
    })
   })

   reques.write(jsondata);

   reques.end();

});



app.listen(process.env.PORT || 5000,function(){
    console.log("Run on localhost 5000");
})




//api key cd360e0c10bbf49061c665a05db8861f-us21
//audiance is 51a8d80f9f.