const mongoose = require("mongoose");
const connectionUri = "mongodb://localhost:27017/studentsapi";

mongoose
  .connect(connectionUri)
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.log(`Error connecting DB: ${err.message}`);
  });
