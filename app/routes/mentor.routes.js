module.exports = app => {
  const upload = require("../config/multer.config.js");
    const mentors = require("../controllers/mentor.controller.js");  
    const accounts = require("../controllers/account.controller.js"); 
    const checkAuth = require('../controllers/middlewares/checkAuth.js');
    var router = require("express").Router();
    router.post("/:accountId", checkAuth, accounts.createUser , mentors.create, accounts.findById); //use
    router.put("/:accountId", checkAuth, mentors.update); //use
    router.put("/resume/:accountId", checkAuth, upload.single("file"), mentors.uploadResume); //use
    router.put("/certificate/:accountId", checkAuth, upload.single("file"), mentors.uploadCertificate); //use
    router.get("/:accountId", checkAuth, mentors.findById); //use
    router.get("/getResume/:id", checkAuth, mentors.getResume); //use
    router.get("/getCertificate/:id", checkAuth, mentors.getCertificate); //use
    app.use('/api/mentors', router);
  };