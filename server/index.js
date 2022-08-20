const express = require("express");
const app = express(); // create express app
const path = require("path");
const db  = require("./DbManager/Db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

var homeController = require("./controllers/HomeController");
var chartController = require("./controllers/ChartController");

app.use("/api/",homeController);
app.use("/api/chart/",chartController);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// start express server on port 3000
app.listen(3000, () => {
  console.log("server started on port 3000");
});

async function ClosePoolAndExit(){
  db.close().then(()=>{
    console.log("pool has ended");
    process.exit(0);
  })

}

process.once("SIGTERM",ClosePoolAndExit).once('SIGINT',  ClosePoolAndExit);