var express = require('express');
var url = require('url');
var bodyParser = require('body-parser');
var md5 = require('md5');
var connecation = require('../configuration/mongoconfig');
var user = require('../model/user_model');
var address = require('../model/address_model');

var datetime = new Date();
var app = express();
app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: true });

module.exports = function (app, db) {
    //View Address book api
    app.get("/display/:userid", urlencodedParser, function (req, res) {
        var uid = req.params.userid;


        address.find({ user_id: uid,is_deleted : 0 })
            .then(address => {
                res.send(address);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving notes."
                });
            });

    });

    //Add Address Api
    app.post("/addaddress/:userid", urlencodedParser, function (req, res) {
        var act = req.body.active;
        var uid = req.params.userid;
        var a = 0;
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        if (act) {
            a = 1;
        }
        else {
            a = 0;
        }

        address.aggregate([
            { $sort: { "address_id": -1 } },
            { $limit: 1 },
            { $sort: { "address_id": 1 } },
            { $limit: 1 }
        ], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                var id = result[0].address_id + 1;
                var address_data = { _id: null, address_id: id, name: req.body.name, email: req.body.email, contact_number: req.body.contact_number, is_active: a, create_date: date, user_id: req.params.userid, is_deleted: 0 };
                address.create(address_data, function (err, rows, fields) {
                    if (err) throw err;
                    else {
                        res.json({ 'res': '0', 'msg': 'successfully insert address' });
                    }
                });

            }
        });


    });
    //Update Address Api
    app.post("/update/:userid/:addressid", urlencodedParser, function (req, res) {
        var act = req.body.active;
        var uid = req.params.userid;
        var addid = req.params.addressid;
        var a = 0;
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        //var date=datetime.getDate()+"/"+datetime.getMonth()+"/"+datetime.getFullYear();
        if (act) {
            a = 1;
        }
        else {
            a = 0;
        }
        var id = Number(req.params.addressid);
        var usid=Number(req.params.userid);
        var where = { address_id: id,user_id:usid };
        var newvalues = { $set: { name: req.body.name, email: req.body.email, contact_number: req.body.contact_number, isactive: a, create_date: date, user_id: req.params.userid, is_deleted: 0 } };
        address.updateOne(where, newvalues, function (err, result) {
            if (err) throw err;
            else {

                address.find({ address_id: id }, function (err, result) {
                    res.json({ 'res': '0', 'msg': 'Successfully update', 'data': result });
                });

            }

        });
    });
    //delete aPi
    app.get("/delete/:userid/:addressid", urlencodedParser, function (req, res) {
        // var aid = req.params.addressid;
        var where = Number(req.params.addressid);
        var usid=Number(req.params.userid);

        address.updateOne({ address_id: where,user_id:usid }, { $set: { is_deleted: 1 } }, function (err, result) {
            if (err) throw err;
            if (result == null) {
                res.json({ 'res': '1', 'msg': 'data not deleted' });
            }
            else {
                console.log("successfully deleted");
                res.json({ 'res': '0', 'msg': 'Successfully deleted' });
            }
        });
    });
};