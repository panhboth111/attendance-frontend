const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

// // Import Routes
const employeeRoute = require("../routes/employees");
const authRoute = require("../routes/auth");
const adminRoute = require("../routes/admin");

module.exports = async (app) => {
  //MiddleWares
  app.use(bodyParser.json({ limit: "10mb", extended: true }));
  app.use(cors());
  //app.use(cors({credentials: true, origin: 'http://35.198.233.99'}));
  app.use("/employees", employeeRoute);
  app.use("/auth", authRoute);
  app.use("/admin", adminRoute);
  return app;
};
