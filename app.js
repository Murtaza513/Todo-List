const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
var alert = require("alert");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");

var items = [];
var workItems = [];

app.get("/", (req, res) => {
  let day = date();

  res.render("list", {
    listTitle: day,
    newListItems: items,
  });
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "WorkList",
    newListItems: workItems,
  });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  console.log(req.body);
  if (item != "") {
    if (req.body.list === "WorkList") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
