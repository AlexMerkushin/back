module.exports = app => {
    const projects = require("../controllers/project.controller");  
    var router = require("express").Router();
    router.post("/", projects.create);
    router.put("/:projectId", projects.update);
    router.get("/", projects.findAllProject);
    router.get("/:projectId", projects.findByProjectId);
    router.get("/mentor/:mentorAccountId", projects.findByMentorId);
    router.get("/date/", projects.findByProtectionDate);
    router.delete("/:projectId", projects.delete);
    app.use('/api/projects', router);
  };