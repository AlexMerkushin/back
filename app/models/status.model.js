const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) =>{
        const Status = sequelize.define("status", {
        direction: {
            type: Sequelize.STRING(20)
        },
        
    });

    return Status;
}