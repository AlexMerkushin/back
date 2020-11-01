const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const Faculty = sequelize.define("faculty", {
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        }
    })
    return Faculty;
}