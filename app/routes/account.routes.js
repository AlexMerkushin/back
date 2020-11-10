module.exports = app => {
  const accounts = require("../controllers/account.controller.js");  
  var router = require("express").Router();
  router.post("/", accounts.create);
  //router.get("/:accountId", accounts.findByAccountId);
  router.get("/", accounts.findAll);
  router.post("/login", accounts.login);
  router.get('/user/:accountId', accounts.user);
  router.put("/:accountId/:password", accounts.update);
  router.get("/find/:id/:type", accounts.find);
  //router.get("/:type", accounts.findAllByType);
  router.delete("/:accountId", accounts.delete);
  app.use('/api/accounts', router);
};