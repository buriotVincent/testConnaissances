let express = require('express');
let session = require('cookie-session');
let bodyParser = require('body-parser');
let mysql = require('mysql');

let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.use(session({secret: "supersecret2"}));

app.use(function(req, res, next) {
    if (typeof(req.session.array) === 'undefined') {
        req.session.array = [];
    }
    next();
});

app.get('/index', function(req, res) {
    res.render('index.ejs', {array: req.session.array});
});

app.post('/index/add', urlencodedParser, function(req, res) {
    if (req.body.newelement !== '') {
        req.session.array.push(req.body.newelement);
        console.log(req.body.newelement);
    }
    res.redirect('/index');
});

app.get('/index/delete/:index', function(req, res) {
    if (req.params.index !== '') {
        req.session.array.splice(req.params.index, 1);
    }
    res.redirect('/index');
})

app.listen(3389);