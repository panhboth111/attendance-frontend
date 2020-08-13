const Employee = require("../models/employee");
const Credential = require("../models/credential");
const WorkCheck = require("../models/work_check");
const department = require("../models/department");
const bcrypt = require("bcrypt");
const validate = require("validate.js");
const jwt = require("jsonwebtoken");
class EmployeeService {
  async allEmployees(role, owner) {
    return new Promise((resolve, reject) => {
      const adminReg = /admin/i;
      if (!adminReg.test(role))
        reject({ message: "You are not authorized!", errCode: "AU-001" });
      Empoloyee.find(
        { email: { $ne: owner }, role: { $ne: "Admin" } },
        { email: 1, name: 1, role: 1 }
      )
        .populated("department_Id", { department_name: 1 })
        .then((employees) => resolve(employees));
    });
  }

  async employee(user) {
    return new Promise(async (resolve, reject) => {
      const employee = await await Employee.findOne({
        email: user.email,
      }).populate("department_Id");
      return resolve(employee);
    });
  }

  async checkIn(reqUser) {
    return new Promise(async (resolve, reject) => {
      const employee = await Employee.findOne({ email: reqUser.email });

      const pending_CheckOut = await WorkCheck.findOne({
        employee_Id: employee._id,
        is_CheckOut: false,
      });
      console.log(pending_CheckOut);
      if (pending_CheckOut) {
        return resolve({
          message: "Error! A checkin is still pending for checkout",
          errCode: "CI-001",
        });
      }
      const currentdate = new Date();
      const check_In =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " at " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      const check = new WorkCheck({
        name: employee.name,
        employee_Id: employee._id,
        check_In,
      });
      await check.save();
      return resolve({
        message: "Successfully check in!",
      });
    });
  }

  async checkOut(reqUser) {
    return new Promise(async (resolve, reject) => {
      const employee = await Employee.findOne({ email: reqUser.email });
      const pending_CheckOut = await WorkCheck.findOne({
        employee_Id: employee._id,
        is_CheckOut: false,
      });
      if (!pending_CheckOut) {
        return resolve({
          message: "Error! No checkin is in pending for checkout",
          errCode: "CO-001",
        });
      }
      const currentdate = new Date();
      const check_Out =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " at " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
      await WorkCheck.updateMany(
        { employee_Id: employee.id },
        {
          check_Out: Date.now(),
          is_CheckOut: true,
          check_Out,
        }
      );
      return resolve({
        message: "Successfully checkout!",
      });
    });
  }

  async signUp({ email, name, pwd }) {
    return new Promise(async (resolve, reject) => {
      let reg = /[a-z,.]{4,}\d{0,4}@team.web.com/gi;
      let role = "";
      if (reg.test(email)) role = "Employee";
      else
        return resolve({
          message: "Only @team.web.com is allowed",
          errCode: "SU-001",
        });
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(pwd, salt, async (err, hash) => {
          if (err) reject(err);
          try {
            department = await Department.findOne({ department_Name: "IT" });
            const employee = new Employee({
              email: email,
              name: name,
              role: role,
              department_Id: department._id,
            });
            const credential = new Credential({
              pwd: hash,
              email: email,
              employee_Id: employee.employee_Id,
              role,
            });
            await employee.save();
            await credential.save();
            return resolve({ message: "Account registered as successfully!" });
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
    });
  }

  async signIn({ email, pwd }) {
    return new Promise(async (resolve, reject) => {
      const constraint = {
        email: {
          presence: true,
          email: true,
        },
        password: {
          presence: true,
          length: {
            minimum: 4,
            maximum: 16,
            tooShort: "is too short",
            tooLong: "is too long",
          },
        },
      };
      const validateRes = validate({ email, pwd }, constraint);
      if (validateRes == undefined)
        return resolve({ message: "Invalid", success: false });
      const existEmployee = await Credential.findOne({ email: email });

      if (!existEmployee)
        return resolve({
          message: "Email does not match with any user",
          success: false,
          token: null,
        });
      const employee = await Employee.findOne({ email });
      console.log(employee);
      bcrypt.compare(pwd, existEmployee.pwd, (err, isMatch) => {
        if (err) return resolve({ err });
        if (isMatch) {
          // if the pwd matches
          // Sign the token
          const token = jwt.sign(
            {
              email: email,
              name: employee.name,
              role: employee.role,
              employee_Id: employee.employee_Id,
            },
            "mytoken"
          );
          console.log("New Login from : " + email);
          //Put token in the header
          return resolve({
            message: "Logged in successfully",
            success: true,
            token,
          });
        } else {
          // if the pwd is not match
          //resolve({"message" : "Password entered is incorrect"})
          return resolve(
            resolve({
              message: "Incorrect password",
              success: false,
              token: null,
            })
          );
        }
      });
    });
  }
}
module.exports = EmployeeService;
