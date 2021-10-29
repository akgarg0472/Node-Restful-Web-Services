const express = require("express");
const studentRouter = require("./router/studentRouter");
require("../db/connection");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(studentRouter);

app.get("*", (req, res) => {
  res.status(404).send({
    status: 404,
    payload: null,
    message: "Error 404, requested resource not found",
  });
});

app.listen(port, () => console.log(`Application is listening on port ${port}`));
