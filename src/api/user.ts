
var user = require('../model/user_model');
module.exports = (app: any) => {

    //Login API
    app.post('/login', async (req: any, res: any, next: any) => {
        try {
            if (!req.body.email) {
                throw new Error("Please enter Email")
            }
            else if (!req.body.password) {
                throw new Error("Please enter Password")
            }
            else {
                var data = await user.findOne({
                    email: req.body.email,
                    password: req.body.password

                }, {
                    "_id": 1,
                    "email": 1,
                    "password": 1
                })
                data = JSON.parse(JSON.stringify(data))

                if (data == null) {
                    res.json({ 'res': '1', 'msg': 'Invalid Email or Password' });
                }
                else {
                    data["user_id"] = data._id
                    res.status(200).json({ 'res': '0', 'msg': 'You are Successfully Logged in!', 'data': data });
                }
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'error': (error as Error).message })
        }
    });

    //Registration API
    app.post('/registration', async (req: any, res: any) => {
        try {
            var datetime = new Date();
            var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
            if (!req.body.email) {
                throw new Error("Please enter Email")
            }
            else if (!req.body.password) {
                throw new Error("Please enter Password")
            }
            else {
                var query = await user.findOne({ email: req.body.email })
                if (query)
                    res.json({ 'res': '1', 'msg': 'Email already exists' })
                else {
                    var result = await user.create({
                        email: req.body.email,
                        password: req.body.password,
                        create_date: date,
                        is_deleted: 0
                    })
                    var data = await user.findOne({
                        email: req.body.email,
                        password: req.body.password
                    }, {
                        "_id": 1,
                        "email": 1
                    })
                    data = JSON.parse(JSON.stringify(data))
                    data["user_id"] = data._id
                    res.status(200).json({ 'res': '0', 'msg': 'You are Successfully Registered.', 'data': data })
                }
            }
        }
        catch (error) {
            res.json({ 'res': '1', 'error': (error as Error).message })
        }
    })
}