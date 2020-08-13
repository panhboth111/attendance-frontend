const mongoose = require("mongoose");

module.exports = async () => {
  const connection = await mongoose.connect(
    "mongodb://0.0.0.0:27017/attendance-app",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  return connection.connection.db;
};
