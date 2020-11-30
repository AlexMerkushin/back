module.exports = app=>{
    const faculties = require("../controllers/faculty.controller.js");
    var router = require("express").Router();
    router.post("/", faculties.create);
    router.put("/:facultyId", faculties.update);
    router.delete("/:facultyId", faculties.deleteFaculty);
    router.get("/", faculties.findAllFaculties);
    router.get("/:facultyId", faculties.findByFacultyId);
    app.use('/api/faculties', router);
}