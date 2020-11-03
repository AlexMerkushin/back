const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const HeadFaculty = sequelize.define("headFaculty", {
        accountId: {
            primaryKey: true,
            type: Sequelize.CHAR(9)
        }
    })
    return HeadFaculty;
}