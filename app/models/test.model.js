const sequelize = require("sequelize");

module.exports = (sequelize, Sequelize)=>{
    const Test = sequelize.define("test", {
        grade: {
            type: Sequelize.INTEGER,
            validate: {
                max: 100,
                min: 0
            }
        },
        date: Sequelize.DATEONLY,
        time: Sequelize.TIME,
        note: Sequelize.STRING
    });
    return Test;
}