const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize)=>{
    const College= sequelize.define("college", {
        name: Sequelize.STRING(30),
        addres: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        phone: {
            type:Sequelize.STRING(18),
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true
        }
    });
    return College;
}