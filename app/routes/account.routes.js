module.exports = app => {
  const accounts = require("../controllers/account.controller.js");  
  const checkAuth = require('../controllers/middlewares/checkAuth.js');
  var router = require("express").Router();
  router.post('/create/:accountId', checkAuth, accounts.createUser, accounts.findById) //use
  router.put("/:accountId/:pass", checkAuth, accounts.update); //use
  router.get("/", checkAuth, accounts.findAll); //use
  router.post("/login", accounts.login);// use
  router.post("/forgetPassword", accounts.forgetPassword);
  router.get("/:type", checkAuth, accounts.findAllByType); //use
  router.get('/user/me', checkAuth,  accounts.user); //use
  router.get(`/user/:accountId`, checkAuth, accounts.findById); //use
  router.put('/:accountId', checkAuth, accounts.updateAccount); //use
  app.use('/api/accounts', router);
};