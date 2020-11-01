const { mentor } = require("../models/index.js");

module.exports = app => {
    const mentors = require("../controllers/mentor.controller.js");  
    var router = require("express").Router();
    router.post("/", mentors.create);
    router.put("/:id", mentors.update);
    router.get("/freelance", mentors.findFreelancer);
    app.use('/api/mentors', router);
  };