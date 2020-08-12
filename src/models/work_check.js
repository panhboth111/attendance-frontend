const mongoose = require("mongoose");

const schema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  employee_Id : {
    type: Number,
    require: true
  },
  check_In: {
    type: Date,
    default: Date.now()
  },
  check_Out: {
    type: Date,
    default: null
  },
  is_CheckOut: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("WorkChecks", schema);
