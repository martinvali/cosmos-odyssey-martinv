const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: "*" });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const enforce = require("express-sslify");

app.set("view engine", "ejs");
app.set("views", __dirname + "/../views");
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(enforce.HTTPS({ trustProtoHeader: true }));

module.exports = { app, server, io };
