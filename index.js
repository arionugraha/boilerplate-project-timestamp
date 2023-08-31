// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

function jsonReturnFactory(date) {
  return {
    unix: date.getTime(),
    utc: date.toUTCString()
  }
}

app.get("/api/:date?", function(req, res) {
  let date = !isNaN(req.params.date)
    ? new Date(parseInt(req.params.date))
    : new Date(req.params.date);

  if (!req.params.date) { 
    date = new Date()
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json(jsonReturnFactory(date));
});
