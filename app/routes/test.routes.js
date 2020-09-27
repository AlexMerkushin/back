
module.exports = app => {
    const test = require("../controllers/test.controller");  
    var router = require("express").Router();
    router.post("/", test.create);
    router.delete("/:id", test.delete);
    router.get("/project/:id", test.findByProject);
    app.use('/api/test', router);
  };
  