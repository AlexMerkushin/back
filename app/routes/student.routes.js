const { student } = require("../models/index.js");

module.exports = app => {
    const students = require("../controllers/student.controller.js");  
    var router = require("express").Router();
    router.post("/", students.create);
    router.put("/:accountId", students.update);
    router.get("/faculty/:facultyId", students.findByFacultyId);
    router.get("/project/:projectId", students.findByProjectId);
    router.get("/findOne/:accountId", students.findByAccountId);
    app.use('/api/students', router);
  };