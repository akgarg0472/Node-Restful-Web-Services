const express = require("express");
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());

// DB
require("./db/connection");
const Student = require("./models/Students");

// home page handler method
app.get("/", (req, res) => {
  res.send({
    status: 200,
    payload: null,
    message: "This is the homepage response from the server",
  });
});

// get all students handler method
app.get("/students", (req, res) => {
  //
  const students = Student.find()
    .then((resp) => {
      res.status(200).send({
        status: 200,
        payload: resp,
        message: "Students data fetch successful",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 500,
        payload: null,
        message: `Failed to fetch students info: ${err.message}`,
      });
    });
});

// get an individual student handler method
app.get("/students/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNo: req.params.rollNumber,
    });

    res.status(200).send({
      status: 200,
      payload: student,
      message: "Request successful",
    });
  } catch (e) {
    res.status(400).send({
      status: 400,
      payload: null,
      message: "Error fetching student",
    });
  }
});

// add new student handler method
app.post("/students", (req, res) => {
  const student = new Student(req.body);
  student
    .save()
    .then((resp) => {
      res.status(201).send({
        status: 201,
        payload: resp,
        message: "Student saved in database successfully",
      });
    })
    .catch((err) => {
      res.status(400).send({
        status: 400,
        payload: null,
        message: `Failed to store student in database: ${err.message}`,
      });
    });
});

// error handler method
app.get("*", (req, res) => {
  res.status(404).send({
    status: 404,
    payload: null,
    message: "Error 404, requested resource not found",
  });
});

app.listen(port, () => console.log(`Application is listening on port ${port}`));
