const sequelize = require("./db");
const User = require("../models/user.sql");
const Item = require("../models/item.sql");

const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await User.sync({ alter: true });
    await Item.sync({ alter: true });

    console.log("User and Items tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectSQL };