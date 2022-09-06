// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

let output;

app.get("/api/:date", function (req, res, next) {
  if (req.params.date.match(/^[0-9]+$/) != null) {
    req.unix = parseInt(req.params.date);
    req.utc = new Date(req.unix).toUTCString();
  } else {
    req.unix = new Date(req.params.date).valueOf();
    req.utc = new Date(req.unix).toUTCString();
  }
  next();
}, (req, res) => {
  if (req.utc == "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({
      unix: req.unix,
      utc: new Date(req.unix).toUTCString()
    });
  };
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
