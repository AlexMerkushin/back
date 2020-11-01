const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize)=>
{
    let Project = sequelize.define("project", {        
         dataUpdate:'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)',
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        ProtectionDate: Sequelize.DATE
    })


    return Project;
}