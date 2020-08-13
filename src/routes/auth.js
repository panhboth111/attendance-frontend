const express = require("express");
const router = express.Router();
// const verify = require("../utilities/VerifyToken");
const EmployeeService = require("../services/EmployeeService");
const employeeService = new EmployeeService();
// Sign Up for an account
router.post("/signUp", async (req, res) => {
  const response = await employeeService.signUp(req.body);
  res.send(response);
});
//Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  const response = await employeeService.signIn(req.body);
  return res.json(response);
});

module.exports = router;
