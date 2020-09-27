const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const Teacher = sequelize.define("teacher", {
        out: Sequelize.BOOLEAN,
        adocation: Sequelize.STRING(20),
    })
    return Teacher;
}