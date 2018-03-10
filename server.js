const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${req.url}`;
    fs.appendFile('server.log',log + '\n',(err) => {
        if(err){
            console.log('Unable to append server log');
        }
    });
    console.log();
    next();
});

// app.use((req,res,next) => {
//     res.render('maintance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return 'CurrentYear: ' + new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
    res.render('hmp.hbs',{
        pageTitle: 'Home Page',
        description: "Welcome NodeJs WebSite"
    })
    //res.send('<h1>Hello Express!!</h1>');
    // res.send({
    //     name: 'OK',
    //     likes: [
    //         'Biking',
    //         'Citites'
    //     ]
    // })
});

//dynamic template
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        pageTitle: 'AboutPage',
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects'
    });
})

app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port,() => {
    console.log(`Server is up ${port}`);
});