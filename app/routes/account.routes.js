module.exports = app => {
    const accounts = require("../controllers/account.controller.js");  
    var router = require("express").Router();
    router.post("/", accounts.create);
    router.get("/:id", accounts.findById);
    router.get("/", accounts.findAll);
    router.get("/:id/:password", accounts.login);
    router.put("/:id/:password", accounts.update);
    router.get("/find/:id/:type", accounts.find);
    router.get("/:type", accounts.findAllByType);
    router.delete("/:id", accounts.delete);
    app.use('/api/accounts', router);
  };