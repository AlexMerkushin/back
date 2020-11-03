module.exports = app=>{
    const faculties = require("../controllers/faculty.controller.js");
    var router = require("express").Router();
    router.post("/", faculties.create);
    router.put("/:facultyId", faculties.update);
    router.get("/", faculties.findAllFaculties);
    router.get("/:facultyId", faculties.findByFacultyId);
    router.delete("/:facultyId", faculties.deleteFaculty);
    app.use('/api/faculties', router);
}