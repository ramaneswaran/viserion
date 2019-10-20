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

//View engine
app.set('view engine', 'ejs')
//Routes
const webhook = require('./routes/webhook');
const postData  = require('./routes/post');
const data = require('./routes/data');

//Route middlewares
app.use('/webhook', webhook);
app.use('/post', postData);
app.use('/data', data);

app.get('/', (req, res)=>{
    res.render('agora');
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