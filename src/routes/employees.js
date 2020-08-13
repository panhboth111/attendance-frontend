const express = require("express");
const router = express.Router();
const verify = require("../utilities/VerifyToken");
const EmployeeService = require("../services/EmployeeService");
const employeeService = new EmployeeService();

// Get all user info
router.get("/allEmployees", verify, async (req, res) => {
  const employees = await employeeService.allEmployees(
    req.user.role,
    req.user.email
  );
  return res.json(employees);
});

// Get user Info
router.get("/employee", verify, async (req, res) => {
  const employee = await employeeService.employee(req.user);
  console.log(employee);
  return res.json(employee);
});

// Checking In
router.get("/checkIn", verify, async (req, res) => {
  const result = await employeeService.checkIn(req.user);
  console.log(result);
  return res.json(result);
});

// Checking Out
router.get("/checkOut", verify, async (req, res) => {
  const result = await employeeService.checkOut(req.user);
  console.log(result);
  return res.json(result);
});

module.exports = router;
