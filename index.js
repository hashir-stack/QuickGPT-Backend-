const express = require("express");
const cors = require("cors");
require("dotenv").config();


const {DbConnection} = require('./config/connectDb.js');
const userRoute = require('./routes/userRoutes.js');

const app = express();


const port = process.env.PORT || 3000 ;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server is Live!!")
});

app.use('/api/user', userRoute);

DbConnection();

app.listen(port,()=>{
    console.log(`Server is Running on Port => ${port}`)
});