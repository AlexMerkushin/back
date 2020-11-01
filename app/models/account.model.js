const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt');
    const Account = sequelize.define("account", {
        id: {
            type: Sequelize.CHAR(9),
            primaryKey: true,
            allowNull: false
        },
        firstName: Sequelize.STRING(15),
        lastName: Sequelize.STRING(15),
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        sex: Sequelize.ENUM("זכר", "נקבה", "אחר"),
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash);
              },
        },
        phone: Sequelize.CHAR(10),
        type: Sequelize.ENUM("student", "mentor", "headFaculty", "worker", "boss"),
        addres: Sequelize.STRING(50)
    })

    return Account;
}