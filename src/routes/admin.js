const express = require("express");
const router = express.Router();
const verify = require("../utilities/VerifyToken");
const AdminService = require("../services/AdminService");
const adminService = new AdminService();
router.post("/user/add", verify, async (req, res) => {
  const response = await adminService.addUser(req.user, req.body);
  console.log(response);
  return res.json(response);
});
router.get("/departments", verify, async (req, res) => {
  const response = await adminService.getDepartments(req.user);
  return res.json(response);
});
router.get("/employees", verify, async (req, res) => {
  const response = await adminService.getEmployees(req.user);
  return res.json(response);
});
router.get("/workchecks", verify, async (req, res) => {
  const response = await adminService.getWorkChecks(req.user);
  return res.json(response);
});
module.exports = router;
