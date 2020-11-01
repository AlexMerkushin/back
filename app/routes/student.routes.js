const { student } = require("../models/index.js");

module.exports = app => {
    const students = require("../controllers/student.controller.js");  
    var router = require("express").Router();
    router.post("/", students.create);
    router.get("/:id", students.findAllByCollege);
    router.put("/:id", students.update);
    router.get("/findOne/:id", students.findByAccountId);
    router.get("/faculty/:id", students.findByFacultyId);
    router.get("/project/:id", students.findByProjectId);
    app.use('/api/students', router);
  };