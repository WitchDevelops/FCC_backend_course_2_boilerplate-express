require("dotenv").config();

let express = require("express");
let app = express();

// serve static files
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


app.use(function middleware(req, res, next) {
  let visitedPathDetails = req.method + " " + req.path + " - " + req.ip;
  console.log(visitedPathDetails);
  next();
});

//json server
app.get("/json", function (req, res) {
  let style = process.env.MESSAGE_STYLE;
  if (style === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

// time server
app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

//echo server
app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});

exports = module.exports = app;
