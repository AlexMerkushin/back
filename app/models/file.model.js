const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        Extension: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        type: {
            type: Sequelize.ENUM("הצעת פרויקט", "ספר פרויקט"),
            allowNull: false
        },
        file: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        },
        createAt: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.fn("now")
        },
        ApprovalMentorDate: Sequelize.DATE,
        ApprovalHeadDate: Sequelize.DATE, 
    })
    return File;
}