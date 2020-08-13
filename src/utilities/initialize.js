const department = require("../models/department");

module.exports = async () => {
  const departments = ["S.E", "TM"];
  const departmentsCreated = await department.findOne();
  if (departmentsCreated) return;
  departments.forEach(async (department_name) => {
    await department.create({ department_name });
  });
};
