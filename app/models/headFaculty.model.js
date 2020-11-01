const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const HeadFaculty = sequelize.define("headFaculty", {
    })
    return HeadFaculty;
}