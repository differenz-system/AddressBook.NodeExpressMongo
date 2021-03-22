var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var user = require('../model/user_model');
module.exports = (app) => {
    app.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.body.email) {
                throw new Error("Please enter Email");
            }
            else if (!req.body.password) {
                throw new Error("Please enter Password");
            }
            else {
                var data = yield user.findOne({
                    email: req.body.email,
                    password: req.body.password
                }, {
                    "_id": 1,
                    "email": 1,
                    "password": 1
                });
                data = JSON.parse(JSON.stringify(data));
                if (data == null) {
                    res.json({ 'res': '1', 'msg': 'Invalid Email or Password' });
                }
                else {
                    data["user_id"] = data._id;
                    res.status(200).json({ 'res': '0', 'msg': 'You are Successfully Logged in!', 'data': data });
                }
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
    app.post('/registration', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            if (!req.body.email) {
                throw new Error("Please enter Email");
            }
            else if (!req.body.password) {
                throw new Error("Please enter Password");
            }
            else {
                var query = yield user.findOne({ email: req.body.email });
                if (query)
                    res.json({ 'res': '1', 'msg': 'Email already exists' });
                else {
                    var result = yield user.create({
                        email: req.body.email,
                        password: req.body.password,
                        create_date: date,
                        is_deleted: 0
                    });
                    var data = yield user.findOne({
                        email: req.body.email,
                        password: req.body.password
                    }, {
                        "_id": 1,
                        "email": 1
                    });
                    data = JSON.parse(JSON.stringify(data));
                    data["user_id"] = data._id;
                    res.status(200).json({ 'res': '0', 'msg': 'You are Successfully Registered.', 'data': data });
                }
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
};
