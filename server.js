const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const api = require("./routes/index");
const compression = require("compression");

// json 형태로 parsing || 중첩가능 || 압축해서 전송
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// 서버시작하면 자동으로 eventListener 시작
// const centralServiceScheduler = require("./routes/scheduler/centralServiceScheduler");
// const localServiceScheduler = require("./routes/scheduler/localServiceScheduler.js");
// centralServiceScheduler;
// localServiceScheduler;

// api 처리는 routes/index.js 에서 함
app.use("/api", api);

// react
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(8000, function () {
  console.log("8000 port is listening!");
});
