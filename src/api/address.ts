
var user = require('../model/user_model');
var address = require('../model/address_model');

module.exports = (app) => {

    //View whole Address Book
    app.get('/getAddressBook', async (req, res) => {
        try {
            var data = await address.find({}, { "_id": 0 })
            res.json({ 'res': '0', 'msg': 'Address Book Displayed', 'data': data })
        } catch (error) {
            res.json({ 'res': '1', 'msg': error.message })
        }
    })
    //View Address Book based on user_id.
    app.get('/getAddressBookByID/:userid', async (req, res) => {
        try {
            var data = await address.find({
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
            })
            data = JSON.parse(JSON.stringify(data))
            if (data.length > 0) {
                data.forEach(element => {
                    element["address_id"] = element._id
                });
            }
            res.json({ 'res': '0', 'msg': 'Successfully Displayed', 'data': data })
        } catch (error) {
            res.json({ 'res': '1', 'msg': error.message })
        }
    })
    //Insert new record in Address Book (Insert Document)
    app.post('/createAddressBook', async (req, res) => {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            var a = req.body.isactive == "true" ? 1 : 0;
            if (!req.body.name) {
                throw new Error("Please enter name")
            }
            else if (!req.body.email) {
                throw new Error("Please enter email")
            }
            else if (!req.body.contact_number) {
                throw new Error("Please enter Contact Number")
            }
            else {
                var data = await address.create({
                    name: req.body.name,
                    email: req.body.email,
                    contact_number: req.body.contact_number,
                    is_active: a,
                    create_date: date,
                    user_id: req.body.user_id,
                    is_deleted: 0
                })
                res.status(200).json({ 'res': '0', 'msg': 'Data Saved Successfully', 'data': data })
            }
        } catch (error) {
            res.json({ 'res': '1', 'msg': error.message })
        }
    })

    //Update Address Book
    app.put("/updateAddressBook/:userid/:addressid", async (req, res) => {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            var a = req.body.isactive == "true" ? 1 : 0;
            if (!req.body.name) {
                throw new Error("Please enter name")
            }
            else if (!req.body.email) {
                throw new Error("Please enter email")
            }
            else if (!req.body.contact_number) {
                throw new Error("Please enter PhoneNumber")
            }
            else {
                var where = { user_id: req.params.userid, _id: req.params.addressid };
                var newvalues =
                {
                    $set: {
                        name: req.body.name,
                        email: req.body.email,
                        contact_number: req.body.contact_number,
                        is_active: a,
                        create_date: date,
                        is_deleted: 0
                    }
                };
                await address.updateOne(where, newvalues)
                var data = await address.find({ _id: req.params.addressid })
                res.status(200).json({ 'res': '0', 'msg': 'Data Updated Successfully', 'data': data })
            }
        } catch (error) {
            res.json({ 'res': '1', 'msg': error.message })
        }
    });

    //It Updates the IS_Deleted Flag to 1 i.e. It will soft delete the document from the collection.
    app.delete("/removeAddressBook/:userid/:addressid", async (req, res) => {
        try {
            await address.updateOne({ _id: req.params.addressid, user_id: req.params.userid }, { $set: { is_deleted: 1 } })
            res.status(200).json({ 'res': '0', 'msg': 'Data Deleted successfully' })
        } catch (error) {
            res.json({ 'res': '1', 'msg': error.message })
        }
    });
}