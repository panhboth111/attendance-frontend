const mongoose = require("mongoose");

module.exports = async () => {
  const connection = await mongoose.connect(
    "mongodb://localhost:27017/attendance-app",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return connection.connection.db;
};
