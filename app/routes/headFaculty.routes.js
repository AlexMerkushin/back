const { headFaculty } = require("../models/index.js");

module.exports = app => {
    const headFaculries = require("../controllers/headFaculty.controller.js");  
    var router = require("express").Router();
    router.post("/", headFaculries.create);
    router.put("/accountId", headFaculries.update);
    router.get("/faculty/:facultyId", headFaculries.findByfacultyId);
    router.get("/:accountId", headFaculries.findById);
    app.use('/api/headfaculries', router);
  };