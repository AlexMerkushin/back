module.exports = app => {
  const upload = require("../config/multer.config.js");
    const mentors = require("../controllers/mentor.controller.js");  
    const accounts = require("../controllers/account.controller.js"); 
    var router = require("express").Router();
    router.post("/:accountId", accounts.createUser , mentors.create, accounts.findById);
    router.put("/:accountId", mentors.update);
    router.put("/resume/:accountId", upload.single("file"), mentors.uploadResume);
    router.put("/certificate/:accountId", upload.single("file"), mentors.uploadCertificate);
    router.get("/freelance", mentors.findFreelancer);
    router.get("/:accountId", mentors.findById);
    router.get("/getResume", mentors.getResume);
    router.get("/getCertificate", mentors.getCertificate);
    app.use('/api/mentors', router);
  };