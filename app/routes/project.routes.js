module.exports = app => {
    const projects = require("../controllers/project.controller");   
    const checkAuth = require('../controllers/middlewares/checkAuth.js');
    var router = require("express").Router();
    router.post("/", checkAuth, projects.create); //use
    router.put("/:projectId", checkAuth, projects.update); //use
    router.get("/", checkAuth, projects.findAllProject); //use
    router.get("/mentor/:accountId", checkAuth, projects.findByMentorId); //use
    router.get("/:projectId", checkAuth, projects.findByProjectId); //use
    router.get("/student/:accountId", checkAuth, projects.findByAccountId); //use
    router.get("/headFaculty/:accountId", checkAuth, projects.findByHeadFacultyId); //use
    app.use('/api/projects', router);
  };