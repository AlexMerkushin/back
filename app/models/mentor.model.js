const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const Mentor = sequelize.define("mentor", {
        Education: Sequelize.STRING(50),
        WorkLocation: Sequelize.STRING(50),
        Resume: Sequelize.BLOB('long'),
        Certificate: Sequelize.BLOB('long')
    })
    return Mentor;
}