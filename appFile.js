const http = require('http');
const express = require('express');
const app = express();
//const expressHbs=require('express-handlebars');

//app.engine('handlebars',expressHbs())
//app.set('view engine','handlebars');
//app.set('views','views');

const path = require('path');
const rootDir = require('./utils/path');
const parser = require('body-parser')
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(parser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes);
app.use('/user', shopRoutes);

// console.log('db data', db.execute('Select * from products').then(res => {
//     console.log(res);
// }).catch(err => {
//     console.log(err);
// }));

// app.use(cors({
//    // 'allowedHeaders': ['sessionId', 'Content-Type','*'],
//    // 'allowedHeaders':['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','access-control-allow-origin'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,PUT,POST,DELETE',
//     'preflightContinue': false
// }));

app.use((req, res, next) => {
    res.send(JSON.stringify({
        success: false,
        data: null,
        error: {
            msg: "Route Not Found"
        }
    }));
    // res.status(404).sendFile(path.join(rootDir,'views','notFound.html'))
});

app.listen(3000);