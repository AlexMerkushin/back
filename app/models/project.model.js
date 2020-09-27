const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize)=>
{
    let Project = sequelize.define("project", {        
         dataUpdate:'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)',
        grade: {
            type: Sequelize.INTEGER,
            validate:{
                min:0,
                max: 100
            },
            defaultValue: 0
        },
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        }   
    })


    return Project;
}