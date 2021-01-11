module.exports = app=>{
    const faculties = require("../controllers/faculty.controller.js");
    const checkAuth = require('../controllers/middlewares/checkAuth.js');
    var router = require("express").Router();
    router.post("/", checkAuth, faculties.create); //use
    router.put("/:facultyId", checkAuth, faculties.update); //use
    router.get("/", checkAuth, faculties.findAllFaculties); //use
    app.use('/api/faculties', router);
}