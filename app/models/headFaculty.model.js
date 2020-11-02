const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const HeadFaculty = sequelize.define("headFaculty", {
        accountId: {
            primaryKey: true,
            type: Sequelize.CHAR(10)
        }
    })
    return HeadFaculty;
}