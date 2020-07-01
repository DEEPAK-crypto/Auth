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

app.use(require('express-session')({
    secret: "I am new to web development",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
    res.render('home');
});

app.get("/secret", function(req, res) {
    res.render("secret");
});

app.listen(3000);