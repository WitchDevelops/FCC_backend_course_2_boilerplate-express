require("dotenv").config();

let express = require("express");
let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let style = process.env.MESSAGE_STYLE;
  if (style === "uppercase") {
    res.json({ message: "HELLO JSON" });
  } else {
    res.json({ message: "Hello json" });
  }
});

exports = module.exports = app;
