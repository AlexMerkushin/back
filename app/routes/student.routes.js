module.exports = app => {
    const students = require("../controllers/student.controller.js");  
    const accounts = require("../controllers/account.controller.js"); 
    var router = require("express").Router();
    router.post("/:accountId",accounts.createUser ,students.create, accounts.findById);
    router.put("/:accountId", students.update);
    router.get("/faculty/:accountId", students.findByFacultyId);
    router.get("/project/:projectId", students.findByProjectId);
    router.get("/findOne/:accountId", students.findByAccountId);
    router.put("/:accountId1/:accountId2/:accountId3", students.addStudentToProject);
    router.get("/stat/faculty", students.studentOfFaculty);
    router.get("/stat/student", students.stat);
    router.get('/stat/:accountId', students.statByFaculty);
    app.use('/api/students', router);
  };