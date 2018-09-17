const express = require('express')
var url = require('url');
const app = express();
var MongoClient = require('mongodb').MongoClient;

app.get('/', (req, res) => res.send('Hello World!'))

var url="mongodb://localhost:27017/";
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

var dbo;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  dbo = db.db("mydb");
  console.log(db.database);
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
//  // db.close();
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.post('/reg',urlencodedParser,function(req,res){
  var c=req.body.cname;
  var a=req.body.address;
  var myobj = { name: req.body.cname, address: req.body.address };
    dbo.collection("customers").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      
    });

})