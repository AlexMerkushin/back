module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 15,
    min: 0,
    acquire: 60000,
    idle: 30000
  }
};

