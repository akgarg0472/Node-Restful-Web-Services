const mongoose = require("mongoose");
const validator = require("validator");

const StudentSchema = new mongoose.Schema({
  rollNo: {
    type: Number,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    minlength: 10,
    unique: [true, "This email is already in use"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Incorrect email format");
      }
    },
  },

  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    required: true,
  },

  address: {
    type: String,
    trim: true,
  },
});

// creating collection
const Student = new mongoose.model("students", StudentSchema);
module.exports = Student;
