var url = "mongodb://localhost:27017/address_book";
var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
