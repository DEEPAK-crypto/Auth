var express = require("express"),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local'),
    passportLocalMogoose = require('passport-local-mongoose'),
    User = require("./models/user"),
    mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/auth_demo_app', { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret: "I am new to web development",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes===========================


app.get("/", function(req, res) {
    res.render('home');
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

//Auth Routes

app.get("/register", function(req, res) {
    res.render('register');
})

app.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
            res.render('secret');
        })

    });
})

app.listen(3000);