module.exports = app => {
    const projects = require("../controllers/project.controller");   
    var router = require("express").Router();
    router.post("/", projects.create);
    router.put("/:projectId", projects.update);
    router.get("/", projects.findAllProject);
    router.get("/mentor/:accountId", projects.findByMentorId);
    //router.get("/date/:data", projects.findByProtectionDate);
    router.delete("/:projectId", projects.delete);
    router.get("/:projectId", projects.findByProjectId);
    router.get("/student/:accountId", projects.findByAccountId);
    router.get("/headFaculty/:accountId", projects.findByHeadFacultyId);
    app.use('/api/projects', router);
  };