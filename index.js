const express = require("express");
const cors = require("cors");
require("dotenv").config();


const {DbConnection} = require('./config/connectDb.js');
const userRoute = require('./routes/userRoutes.js');
const chatRoute = require('./routes/chatRoutes.js');
const messageRoute = require('./routes/messageRoutes.js');
const creditRoute = require('./routes/creditRoutes.js');
const { stripeWebhooks } = require("./controller/webhook.js");

const app = express();


const port = process.env.PORT || 3000 ;

// Stripe WebHooks
app.post('/api/stripe',express.raw({type: 'application/json'}),stripeWebhooks);

app.use(cors());
app.use(express.json());



app.get('/',(req,res)=>{
    res.send("Server is Live!!")
});

app.use('/api/user', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/message', messageRoute);
app.use('/api/credit', creditRoute);

DbConnection();

app.listen(port,()=>{
    console.log(`Server is Running on Port => ${port}`)
});