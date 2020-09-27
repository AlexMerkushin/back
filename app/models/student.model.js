const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");


// return id column in table
module.exports= (sequelize, Sequelize)=>{
    const Student = sequelize.define("student", {  
    })
    return Student;
}