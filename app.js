const express = require('express');
const mongoose = require('mongoose');

require('dotenv/config');

//Set up express app
const app = express();

//Setup body parser for post requests
app.use(express.json());
app.use(express.urlencoded({extended :true}));

//Set up a middleware
app.use(express.static('public'));

//Routes
const webhook = require('./routes/webhook');

//Route middlewares
//app.use('/webhook', webhook);

app.get('/', (req, res)=>{
    res.send('Aegon');
});

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 }).then(()=>{
     console.log(`Connected to DB`)
 }).catch(err=>{
     console.log(`DB error ${err.message}`);
     process.exit(-1)
 });


app.listen(process.env.PORT || 3000, ()=>{
    console.log("Listening to port");
});