const mongoose = require("mongoose");

const schema = mongoose.Schema({
  department_name: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Departments", schema);
