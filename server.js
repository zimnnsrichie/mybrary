require('dotenv').config();

const express = require('express');
const server = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes');

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.set('layout', 'layouts/layout');
server.use(expressLayouts);
server.use(express.static(__dirname + '/public'));
server.use(indexRouter);

/* mongodb - start */
mongoose.connect(process.env.DATABASE_URL);

mongoose.connect(process.env.DATABASE_URL, (err, result) => {
    if(err){
        console.log("unable to connect to database");
    }
    else{
        console.log("connected to database");
    }
});

/* mongodb - end */


server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is listening...');
});
