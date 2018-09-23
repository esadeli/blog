'use strict'

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended : false}));
app.use(express.json());
app.use(cors());


// for testing purposes use blogdbtesting
// mongoose.connect('mongodb://localhost:27017/blogdbtesting',{ useNewUrlParser: true })
if(process.env.NODE_ENV==='test'){
    mongoose.connect('mongodb://localhost:27017/blogdbtesting',{ useNewUrlParser: true })
}else{
    mongoose.connect(process.env.MONGO_USER, { useNewUrlParser : true});
    // mongoose.connect('mongodb://localhost:27017/blogdb',{ useNewUrlParser: true });
}



//----> Define your routes here
const UserRouter = require('./routes/UserRouter');
const ArticleRouter = require('./routes/ArticleRouter');
const CommentRouter = require('./routes/CommentRouter');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected blogdb!`);
});

//----> Call your routes here
app.use('/users',UserRouter);
app.use('/articles',ArticleRouter);
app.use('/comments/',CommentRouter);

app.get('/',(req,res)=>{
    console.log('Base set up OK')
    res.send('OK')// penyebab error mlab jika tidak dipasang
});

app.listen(process.env.PORT ||3000, ()=>{
    console.log('You are listening to PORT')
})

module.exports = app