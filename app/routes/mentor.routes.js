module.exports = app => {
  const upload = require("../config/multer.config.js");
    const mentors = require("../controllers/mentor.controller.js");  
    var router = require("express").Router();
    router.post("/", mentors.create);
    router.put("/:accountId", mentors.update);
    router.get("/freelance", mentors.findFreelancer);
    router.get("/:accountId", mentors.findById);
    router.put("/resume/:accountId", upload.single("file"), mentors.uploadResume);
    router.put("/certificate/:accountId", upload.single("file"), mentors.uploadCertificate);
    app.use('/api/mentors', router);
  };