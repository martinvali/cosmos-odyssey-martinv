require("dotenv").config({ path: __dirname + "/configs.env" });

const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.qdaga.mongodb.net/cosmos-odyssey?retryWrites=true&w=majority`
);

module.exports = mongoose;
