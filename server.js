const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

var port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (message)=> {
    return message.toUpperCase();
});

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = now + ' request metod: ' + req.method + ' request url: ' + req.url; 
    console.log(log);
    fs.appendFile('server.logs', log + '\n', (err)=> {
        if (err) {
            console.log('could not be append in server.logs');
        }
    });
    next();
});
app.get('/', (req, res) => {
    res.render('home.hbs', {
        'pageHeading': 'Home Page',
        'welcomeMessage': 'Welcome to my website'
    });
});

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        'pageHeading': 'About Page',
    });
});
app.listen(port, ()=> {
    console.log('server running on 3000 port');
});