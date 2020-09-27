module.exports = app => {
const colleges = require("../controllers/college.controller");
  
    var router = require("express").Router();
    router.post("/", colleges.create);
    router.get("/", colleges.findAll);
    router.get("/:id", colleges.findOne);
    router.get("/pk/:id", colleges.findPk);
    app.use('/api/colleges', router);
  };
  