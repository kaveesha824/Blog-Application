const { DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = User;
