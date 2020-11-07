const { mentor } = require("../models/index.js");

module.exports = app => {
    const mentors = require("../controllers/mentor.controller.js");  
    var router = require("express").Router();
    router.post("/", mentors.create);
    router.put("/:accountId", mentors.update);
    router.get("/freelance", mentors.findFreelancer);
    router.get("/:accountId", mentors.findById);
    router.put("/resume/:accountId", mentors.uploadResume);
    app.use('/api/mentors', router);
  };