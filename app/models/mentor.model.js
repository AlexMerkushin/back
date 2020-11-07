const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports=(sequelize, Sequelize)=>{
    const Mentor = sequelize.define("mentor", {
        accountId: {
            primaryKey: true,
            type: Sequelize.CHAR(9)
        },
        Education: Sequelize.STRING(50),
        WorkLocation: Sequelize.STRING(50),
        resume: Sequelize.BLOB('long'),
        resumeName: Sequelize.STRING(50),
        resumeExtension: Sequelize.STRING(50),
        certificate: Sequelize.BLOB('long'),
        certificateExtension: Sequelize.STRING(50),
        certificateName: Sequelize.STRING(50)
    })
    return Mentor;
}