	
module.exports = app=>{
  const upload = require("../config/multer.config.js");
  const fileWorker = require('../controllers/file.controller.js');
  var router = require("express").Router();
  router.post("/",upload.single("file"), fileWorker.upload);
  router.delete("/:id", fileWorker.deleteOne)
  router.get("/project/:id", fileWorker.findByProject);
  router.get("/:id/:projectId", fileWorker.getFileById)
  app.use('/api/file', router);
}