const Employee = require("../models/employee");
const Credential = require("../models/credential");
const WorkCheck = require("../models/work_check");
const department = require("../models/department");
const bcrypt = require("bcrypt");
class AdminService {
  superAdmin() {
    return new Promise(async (resolve) => {
      try {
        const adminExists = await Employee.findOne();
        if (adminExists) return resolve("admin already created");
        const role = "Super Admin";
        const email = "superadmin@team.web.com";
        const name = "Neak Panhboth";
        const pwd = "webteam123";
        bcrypt.genSalt(10, async (err, salt) => {
          bcrypt.hash(pwd, salt, async (err, hash) => {
            if (err) reject(err);
            try {
              const employee = new Employee({
                name: name,
                role: role,
                email: email,
              });
              const credential = new Credential({
                email: email,
                pwd: hash,
                employee_Id: employee.employee_Id,
                role,
              });
              await employee.save();

              await credential.save();

              return resolve({
                message: "Account registered as successfully!",
              });
            } catch (err) {
              if (err.code == 11000)
                resolve({
                  message: "Email is already registered!",
                  errCode: "SU-002",
                });
              return resolve({ err: err.message, errCode: "SU-003" });
            }
          });
        });
      } catch (error) {}
    });
  }
  addUser(admin, newUser) {
    return new Promise(async (resolve) => {
      try {
        if (admin.role !== "Admin" && admin.role !== "Super Admin")
          return resolve({ success: false, message: "You are unauthorized" });
        const { name, pwd, email, role } = newUser;
        const userExists = await Credential.findOne({ email });
        if (userExists)
          return resolve({ success: false, msg: "email already used" });
        bcrypt.genSalt(10, async (err, salt) => {
          bcrypt.hash(pwd, salt, async (err, hash) => {
            if (err) reject(err);
            try {
              const _department = await department.findOne();
              console.log(_department);
              const employee = new Employee({
                email: email,
                name: name,
                role: role ? "Admin" : "Employee",
                department_Id: _department._id,
              });
              const credential = new Credential({
                pwd: hash,
                email: email,
                employee_Id: employee.employee_Id,
                role,
              });
              await employee.save();
              await credential.save();
              return resolve({
                success: true,
                message: "Account registered as successfully!",
              });
            } catch (err) {
              if (err.code == 11000)
                resolve({
                  message: "Email is already registered!",
                  success: false,
                });
              return resolve({ message: err.message, success: false });
            }
          });
        });
      } catch (error) {}
    });
  }
  getDepartments(admin) {
    return new Promise(async (resolve) => {
      try {
        if (admin.role !== "Admin" && admin.role !== "Super Admin")
          return resolve({
            success: false,
            message: "You are unauthorized",
            data: null,
          });
        const departments = await department.find();
        console.log(departments);
        return resolve({
          success: true,
          message: "Retrieved successfully",
          data: departments,
        });
      } catch (error) {
        return resolve({ success: false, message: error.message, data: null });
      }
    });
  }
  getEmployees(admin) {
    return new Promise(async (resolve) => {
      try {
        if (admin.role !== "Admin" && admin.role !== "Super Admin")
          return resolve({
            success: false,
            message: "You are unauthorized",
            data: null,
          });
        const employees = await Employee.find({
          role: "Employee",
        }).populate("department_Id");

        return resolve({
          success: true,
          message: "Retrieved successfully",
          data: employees,
        });
      } catch (error) {
        return resolve({ success: false, message: error.message, data: null });
      }
    });
  }
  getWorkChecks(admin) {
    return new Promise(async (resolve) => {
      try {
        if (admin.role !== "Admin" && admin.role !== "Super Admin")
          return resolve({
            success: false,
            message: "You are unauthorized",
            data: null,
          });
        const workchecks = await WorkCheck.find();
        return resolve({
          success: true,
          message: "Retrieved successfully",
          data: workchecks,
        });
      } catch (error) {
        return resolve({ success: false, message: error.message, data: null });
      }
    });
  }
}
module.exports = AdminService;
