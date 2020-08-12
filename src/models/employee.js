const mongoose = require("mongoose");

const schema = mongoose.Schema({
  employee_Id : {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: "Employee"
  },
  department_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Departments'
  },
  profilePic: {
    type: String,
    default: "https://t3.ftcdn.net/jpg/00/64/67/52/240_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"
  }
});

module.exports = mongoose.model("Employees", schema);
