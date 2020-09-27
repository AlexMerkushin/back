const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB('long')
        },
        main: Sequelize.BOOLEAN,
        createAt: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.fn("now")
        },
        
    })
    return File;
}