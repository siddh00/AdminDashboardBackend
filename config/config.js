const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("finaladmin", "root", "Siddu@2000", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection has been secured");
  } catch (error) {
    console.log("error");
  }
};

auth();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.f_Employee = require("../models/f_Employee")(sequelize, DataTypes);
db.t_login = require("../models/t_login")(sequelize, DataTypes);

db.sequelize.sync({ alter: true });

module.exports = { db }



