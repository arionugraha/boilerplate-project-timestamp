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

app.get("/api/:date", (req, res) => {
  let date;

  if (!isNaN(req.params.date)) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json(jsonReturnFactory(date));
});

app.get("/api", (req, res) => {
  res.json(jsonReturnFactory(new Date()));
})


const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

