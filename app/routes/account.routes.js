module.exports = app => {
  const accounts = require("../controllers/account.controller.js");  
  var router = require("express").Router();
  router.post("/", accounts.create);
  router.put("/:accountId/:pass", accounts.update);
  router.get("/", accounts.findAll);
  router.post("/login", accounts.login);
  router.get("/:type", accounts.findAllByType);
  router.delete("/:accountId", accounts.delete);
  router.get('/user/:accountId', accounts.user);
  router.put('/user/:accountId/:pass', accounts.updatePass);
  app.use('/api/accounts', router);
};