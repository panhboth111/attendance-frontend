const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  employee_Id: {
    type: String,
    require: true,
  },
  check_In: {
    type: String,
  },
  check_Out: {
    type: String,
    default: "",
  },
  is_CheckOut: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("WorkChecks", schema);
