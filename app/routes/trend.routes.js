module.exports = app=>{
    const trend = require("../controllers/trend.controller.js");
    var router = require("express").Router();
    router.post("/", trend.create);
    router.get("/", trend.findAll);
    router.get("/:id", trend.findByPk);
    router.put("/:id", trend.update);
    router.delete("/:id", trend.delete);
    app.use('/api/trends', router);
}