const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");


// return id column in table
module.exports= (sequelize, Sequelize)=>{
    const Student = sequelize.define("student", {
        finishDate: Sequelize.DATE(),
        gradeProject: {
            type: Sequelize.INTEGER,
            validate:{
                min:0,
                max: 100
            },
            defaultValue: 0
        },
    })
    return Student;
}