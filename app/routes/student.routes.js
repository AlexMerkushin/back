module.exports = app => {
    const students = require("../controllers/student.controller.js");  
    const accounts = require("../controllers/account.controller.js"); 
    const checkAuth = require('../controllers/middlewares/checkAuth.js');
    var router = require("express").Router();
    router.post("/:accountId", checkAuth, accounts.createUser ,students.create, accounts.findById); //use
    router.put("/:accountId", checkAuth, students.update); //use
    router.get("/faculty/:accountId", checkAuth, students.findByFacultyId); //use
    router.put("/:accountId1/:accountId2/:accountId3", checkAuth, students.addStudentToProject); //use
    router.get("/stat/student", checkAuth, students.stat); //use
    router.get('/stat/:accountId', checkAuth, students.statByFaculty); //use
    app.use('/api/students', router);
  };