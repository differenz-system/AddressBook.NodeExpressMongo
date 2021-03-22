var express = require('express');

var connection = require('./mongoconfig');

var app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,crossdomain,withcredentials,Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

import temp=require('./route');
temp(app);

var server = app.listen(8800, ()=> {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at %s:%s Port", host, port);
});
