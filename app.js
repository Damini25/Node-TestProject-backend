const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const parser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const mongoDbURI = 'mongodb+srv://Damini:Jl8CGpsFIIxypgeb@cluster0-qpcj9.mongodb.net/test';

const sessionStore = new mongoDBStore({
    uri: mongoDbURI,
    collection: 'sessionCollection',
});
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const loginRoutes = require('./routes/login');

app.use(parser.urlencoded({
    extended: true
}));
app.use(parser.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
}));

app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))

app.use('/admin', adminRoutes);
app.use('/user', shopRoutes);
app.use(loginRoutes);
app.use((req, res, next) => {
    res.send(JSON.stringify({
        success: false,
        data: null,
        error: {
            msg: "Route Not Found"
        }
    }));
});

mongoose.connect(mongoDbURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log('connected')
        app.listen(3000);
    }
).catch(err => console.log(err));
