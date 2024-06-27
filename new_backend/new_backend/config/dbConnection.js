const mongoose = require("mongoose");
const config = require("./config"); // get config file

// shopping
mongoose.Promise = global.Promise;

const connectionString = `mongodb://0.0.0.0:27017/${config.database.database}`;

mongoose.connect(connectionString).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Can not connect to the database " + err);
  }
);
// mongoose.set("useCreateIndex", true);
