const mongoose = require("mongoose");
// const { MONGO_CONNECTION_URI } = require("./keys");
require('dotenv').config()

const MONGO_CONNECTION_URI  = process.env.MONGO_CONNECTION_URI ;


console.log(process.env.MONGO_CONNECTION_URI);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_CONNECTION_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
