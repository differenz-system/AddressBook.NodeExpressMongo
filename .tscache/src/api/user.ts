var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var md5 = require('md5');
var connection = require('../configuration/mongoconfig');

var rout = require('router');
var user = require('../model/user_model');
var server = require('../configuration/server');
var datetime = new Date();
var urlencodedParser = bodyParser.urlencoded({ extended: true });
var app = express();

app.use(rout);
app.use(bodyParser.json());


module.exports = function (app, db) {
    
    //Login API
    app.post('/login', urlencodedParser, function (req, res) {

        var ui = req.body.email;
        var pas = req.body.password;
        var pass = md5(req.body.password);
        

        user.findOne({ email: req.body.email, password: pass }, function (err, result) {
            if (err) throw err;
            if (result == null) {
                res.json({ 'res': '1', 'msg': 'check email id or password' });
            }
            else {
                res.json({ 'res': '0', 'msg': 'successfully login' });
            }
        });




    });


    //Registration API
    app.post("/registration", urlencodedParser, function (req, res, next) {
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        var id;
        console.log(req.body.email);
        var pass = md5(req.body.password);
        console.log(user.find({}).sort({ _id: -1 }).limit(1));
        

        user.aggregate([
            { $sort: { "user_id": -1 } },
            { $limit: 2 },
            { $sort: { "user_id": 1 } },
            { $limit: 1 }
        ], function (err, result) {
            if (err) {
                next(err);
            } else {
                id = result[0].user_id + 1;
                var user_data = { user_id: id, email: req.body.email, password: pass, external_id: null, create_date: date,is_deleted:0 };

                user.create(user_data, function (err, rows, fields) {
                    if (err) {
                        throw err;
                    }
                    else {
                        res.json({ 'res': '0', 'msg': 'successfully insert' });
                    }


                });
           
            }
        });
        
    });
};
