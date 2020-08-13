const databaseLoader = require("./database");
const appLoader = require("./app");
const AdminService = require("../services/AdminService");
const initialize = require("../utilities/initialize");
module.exports = async (app) => {
  const adminService = new AdminService();
  await databaseLoader();
  console.log("database initialized");
  await appLoader(app);
  console.log("app initialized");
  await adminService.superAdmin();
  await initialize();
};
