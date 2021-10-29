const express = require("express");
const router = express.Router();
const Student = require("../models/Students");

// get all students handler method
router.get("/students", (req, res) => {
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
router.get("/students/:rollNumber", async (req, res) => {
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
router.post("/students", (req, res) => {
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

module.exports = router;
