module.exports = app => {
    const projects = require("../controllers/project.controller");  
    var router = require("express").Router();
    router.post("/", projects.create);
    router.put("/:projectId", projects.update);
    router.get("/", projects.findAllProject);
    router.get("/mentor/:mentorAccountId", projects.findByMentorId);
    router.get("/date/:data", projects.findByProtectionDate);
    router.delete("/:projectId", projects.delete);
    router.get("/:projectId", projects.findByProjectId);
    router.get("/findByAccountId/:id", projects.findByAccountId);
    router.get("/findByHeadFacultyId/:id", projects.findByHeadFacultyId);
    app.use('/api/projects', router);
  };