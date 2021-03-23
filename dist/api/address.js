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
var address = require('../model/address_model');
module.exports = (app) => {
    app.get('/getAddressBook', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            var data = yield address.find({}, { "_id": 0 });
            res.json({ 'res': '0', 'msg': 'Address Book Displayed', 'data': data });
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
    app.get('/getAddressBookByID/:userid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            var data = yield address.find({
                user_id: req.params.userid,
                is_deleted: 0
            }, {
                "_id": 1,
                "name": 1,
                "email": 1,
                "contact_number": 1,
                "is_active": 1,
                "create_date": 1,
                "user_id": 1
            });
            data = JSON.parse(JSON.stringify(data));
            if (data.length > 0) {
                data.forEach(element => {
                    element["address_id"] = element._id;
                });
            }
            res.json({ 'res': '0', 'msg': 'Successfully Displayed', 'data': data });
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
    app.post('/createAddressBook', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            var a = req.body.isactive == "true" ? 1 : 0;
            if (!req.body.name) {
                throw new Error("Please enter name");
            }
            else if (!req.body.email) {
                throw new Error("Please enter email");
            }
            else if (!req.body.contact_number) {
                throw new Error("Please enter Contact Number");
            }
            else {
                var data = yield address.create({
                    name: req.body.name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    is_active: a,
                    create_date: date,
                    user_id: req.body.user_id,
                    is_deleted: 0
                });
                res.status(200).json({ 'res': '0', 'msg': 'Data Saved Successfully', 'data': data });
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
    app.put("/updateAddressBook/:userid/:addressid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            var a = req.body.isactive == "true" ? 1 : 0;
            if (!req.body.name) {
                throw new Error("Please enter name");
            }
            else if (!req.body.email) {
                throw new Error("Please enter email");
            }
            else if (!req.body.contact_number) {
                throw new Error("Please enter PhoneNumber");
            }
            else {
                var where = { user_id: req.params.userid, _id: req.params.addressid };
                var newvalues = {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        contact_number: req.body.contact_number,
                        is_active: a,
                        create_date: date,
                        is_deleted: 0
                    }
                };
                yield address.updateOne(where, newvalues);
                var data = yield address.find({ _id: req.params.addressid });
                res.status(200).json({ 'res': '0', 'msg': 'Data Updated Successfully', 'data': data });
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
    app.delete("/removeAddressBook/:userid/:addressid", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield address.updateOne({ _id: req.params.addressid, user_id: req.params.userid }, { $set: { is_deleted: 1 } });
            res.status(200).json({ 'res': '0', 'msg': 'Data Deleted successfully' });
        }
        catch (error) {
            res.json({ 'res': '1', 'msg': error.message });
        }
    }));
};
