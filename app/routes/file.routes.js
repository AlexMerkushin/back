	
module.exports = app=>{
  const upload = require("../config/multer.config.js");
  const fileWorker = require('../controllers/file.controller.js');
  const checkAuth = require('../controllers/middlewares/checkAuth.js');
  var router = require("express").Router();
  router.post("/",checkAuth, upload.single("file"), fileWorker.upload); //use
  router.put("/:fileId", checkAuth, fileWorker.update); //use
  router.get("/:fileId", checkAuth, fileWorker.findById); //use
  app.use('/api/file', router);
}