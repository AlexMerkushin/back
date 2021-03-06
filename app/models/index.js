
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    timestamps: false
}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.file = require("./file.model.js")(sequelize, Sequelize);
db.mentor = require("./mentor.model.js")(sequelize, Sequelize);
db.faculty = require("./faculty.model.js")(sequelize, Sequelize);
db.student = require("./student.model.js")(sequelize, Sequelize);
db.account = require("./account.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);


//forgien key 1:1

db.faculty.belongsTo(db.account, {
  foreignKey: {
    name: "accountId",
    unique: true,
  },
  onDelete:"RESTRICT"
});


db.account.hasOne(db.student, {
  foreignKey: {
    allowNull: false,
    unique: true,
    name: "accountId"
  },
  onDelete:"CASCADE"
});

db.account.hasOne(db.mentor, {
  foreignKey: {
    allowNull: false,
    unique: true,
    name: "accountId"
  },
  onDelete:"CASCADE"
});
db.faculty.hasMany(db.student, {onDelete: "RESTRICT"});
db.project.hasMany(db.student, {onDelete: "RESTRICT"});
db.project.hasMany(db.file, {onDelete: "CASCADE"});
db.mentor.hasMany(db.project, {onDelete: "RESTRICT"});






module.exports = db;