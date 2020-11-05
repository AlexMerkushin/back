module.exports = app => {
    const projectMs = require("../controllers/projectM.controller");  
    var router = require("express").Router();
    router.post("/", projectMs.create);
    router.put("/:projectMId", projectMs.update);
    app.use('/api/projectMs', router);
  };