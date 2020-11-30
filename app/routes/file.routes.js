	
module.exports = app=>{
  const upload = require("../config/multer.config.js");
  const fileWorker = require('../controllers/file.controller.js');
  var router = require("express").Router();
  router.post("/",upload.single("file"), fileWorker.upload);
  router.put("/:fileId", fileWorker.update);
  router.get("/project/:projectId", fileWorker.findByProjectId);
  router.delete("/:fileId", fileWorker.deleteOne);
  router.get("/:fileId", fileWorker.findById);
  app.use('/api/file', router);
}