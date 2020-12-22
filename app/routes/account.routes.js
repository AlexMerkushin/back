module.exports = app => {
  const accounts = require("../controllers/account.controller.js");  
  const checkAuth = require('../controllers/middlewares/checkAuth.js');
  var router = require("express").Router();
  router.post("/", accounts.create);
  router.post('/create/:accountId', accounts.createUser, accounts.findById)
  router.put("/:accountId/:pass", accounts.update);
  router.get("/", accounts.findAll);
  router.post("/login", accounts.login);
  router.get("/:type", accounts.findAllByType);
  router.delete("/:accountId", accounts.delete);
  router.get('/user/me', checkAuth,  accounts.user);
  router.get(`/user/:accountId`, checkAuth, accounts.findById);
  router.put('/user/:accountId/:pass', accounts.updatePass);
  app.use('/api/accounts', router);
};