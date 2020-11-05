
module.exports = app => {
    const teachers = require("../controllers/teacher.controller.js");
  
    var router = require("express").Router();
    router.post("/", teachers.create);
    router.get("/", teachers.findAll);
    router.get("/:id", teachers.findByPk);
    router.get("/college/:id", teachers.findByCollege);
    router.get("/findOne/:id", teachers.findOne);
    router.put("/:accountId", teachers.update);
    app.use('/api/teachers', router);
  };
  