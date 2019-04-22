var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var cookieParser = require('cookie-parser');

var url = "mongodb://localhost:27017/admin";




MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  var dbo = db.db("admin");
  dbo.collection("test_data").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
app.use(cookieParser());
app.use(function(req,res,next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods','POST');
	res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials',true);
	next();
});

app.post('/addUser', (req, res) => {
    let response = req.body;
    
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
        var dbo = db.db("admin");
        var myobj = { name: "Company Inc", age: 26 };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

});

app.use(cors());
app.set('port', process.env.PORT || 4201);

var server = app.listen(app.get('port'), function() {

  console.log('Express server listening on port ' + server.address().port);

});

module.exports = app;