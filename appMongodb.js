const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const parser = require('body-parser');
const mongoConnect=require('./utils/database').mongoConnect;

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(parser.urlencoded({
    extended:true
}));
app.use(parser.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
  }));

app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes);
app.use('/user', shopRoutes);

// app.use((req, res, next) => {
//     res.send(JSON.stringify({
//         success: false,
//         data: null,
//         error: {
//             msg: "Route Not Found"
//         }
//     }));
// });

mongoConnect(()=>{
    app.listen(3000);
});
