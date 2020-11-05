const db = require("../models");
const ProjectM = db.projectM;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { // create a new project
    const projectM = {
        name: req.body.name,
        mentorAccountId: req.body.mentorAccountId
    };
    ProjectM.create(projectM).then(data => { res.status(201).send(data) }).catch(res.status(298))
};

exports.update = (req, res)=>{ //update the mentor 
    const id = req.params.projectMId;
    ProjectM.update(req.body, {where:{id:id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findAllProjectM = (req, res)=> {
    ProjectM.findAll().then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}