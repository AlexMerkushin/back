const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const bcrypt = require('bcrypt');
    const Account = sequelize.define("account", {
        id: {
            type: Sequelize.CHAR(10),
            primaryKey: true,
            allowNull: false
        },
        firstName: Sequelize.STRING(10),
        lastName: Sequelize.STRING(10),
        email: {
            type: Sequelize.STRING(40),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        sex: Sequelize.ENUM("זכר", "נקבה"),
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash);
              },
        },
        phone: Sequelize.CHAR(10),
        type: Sequelize.ENUM("student", "college", "examine", "worker", "teacher"),
        addres: Sequelize.STRING(30)
    })

    return Account;
}