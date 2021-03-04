const express = require('express');
const router = express.Router();

const Author = require('../models/author');

// All authors route
router.get('/', (req, res) => {
    let searchOptions = {};
    if (req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    const authors = Author.find(searchOptions, (err, data) => {
        if(err){
            res.redirect('/');            
        } else {
            res.render('authors/index', {
                authors: data,
                searchOptions: req.query
            });
        }
    });
});


// New author route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});

// Create author route
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    });

    author.save()
    .then((data) => {
        res.redirect('authors');
    })
    .catch((err) => {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    });
});

module.exports = router;
