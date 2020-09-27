const sequelize = require("sequelize");
const { Sequelize } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Trend = sequelize.define("trend", {
        name: Sequelize.STRING(25)
    })
    return Trend;
}