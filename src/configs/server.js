const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: "*" });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

module.exports = { app, server, io };
