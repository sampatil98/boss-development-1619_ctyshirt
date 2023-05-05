const express=require("express");
const cors=require("cors");
require("dotenv").config();


const connection=require("./config/db");
const {userRoute}=require("./Routes/user.route");
const {productRouter}=require("./Routes/product.route");


const app=express();

app.use(express.json());
app.use(cors());

app.use("/user",userRoute);
app.use("/product",productRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("connected to DB");
        console.log("server is running at port 8080");
    }catch(err){
        console.log(err);
    }
})