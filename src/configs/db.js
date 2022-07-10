require("dotenv").config({ path: __dirname + "/configs.env" });

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

module.exports = mongoose;
