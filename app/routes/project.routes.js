module.exports = app => {
    const projects = require("../controllers/project.controller.js");  
    var router = require("express").Router();
    router.post("/", projects.create);
    router.get("/", projects.findAll);
    router.get("/status", projects.findStatus);
    router.get("/student/:id", projects.findByStudent);
    router.get("/teacher/:id", projects.findByTeacher);
    router.put("/:id", projects.update);
    router.put("/plus1/:id", projects.addOne);    
    router.delete("/:id", projects.delete);  
    app.use('/api/projects', router);
  };
  