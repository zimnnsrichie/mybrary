if(process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');
const server = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.set('layout', 'layouts/layout');
server.use(expressLayouts);
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({limit: '10mb',  extended: false}));

server.use('/', indexRouter);
server.use('/authors', authorRouter);
server.use('/books', bookRouter);

/* mongodb - start */

mongoose.connect(process.env.DATABASE_URL, (err, result) => {
    if(err){
        console.log("unable to connect to database");
    }
    else{
        console.log("connected to database");
    }
});

/* mongodb - end */


server.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log('Server is listening...');
});
