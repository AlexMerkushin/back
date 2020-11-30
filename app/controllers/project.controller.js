const { sequelize, project } = require("../models");
const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { // create a new project
    const project = {
        name: req.body.name,
        mentorAccountId: req.body.mentorAccountId
    };
    Project.create(project).then(data => { res.status(201).send(data) }).catch(res.status(298))
};

exports.update = (req, res)=>{ //update the mentor 
    const id = req.params.projectId;
    Project.update(req.body, {where:{id:id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findAllProject = (req, res)=> {
    Project.findAll().then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}


exports.findByMentorId = (req, res)=> {
    const mentorAccountId = req.params.mentorAccountId;
    Project.findAll({where: {mentorAccountId: mentorAccountId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findByProtectionDate = (req,res)=>{
    const date = req.params.date;
    Project.findAll({where: sequelize.where(sequelize.fn('YEAR', sequelize.col('dateField')), date)}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.delete = (req, res) => { // delete project
    const projectId = req.params.projectId;
    Project.destroy({ where: { id: projectId } }).then(project => {
      if (project == 1) res.send("נמחק בהצלחה");
      else res.status(299).send("לא נמצאו רשומות למחיקה");
    }).catch(e => { res.status(299).send("שגיאה לא ידועה") });
  }


  exports.findByProjectId = (req, res)=> {
    const id = req.params.projectId;
    Project.findOne({where: {id: id}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findByAccountId = (req, res) =>{
      const id = req.params.id;
     Project.findAll({include: [{model: db.student, where: {accountId: id}, attributes: ['accountId'], required: true}, {model: db.file, attributes:{exclude:['file', 'projectId']}}]}).then(dd=>res.send(dd));
  }

  exports.findByHeadFacultyId = (req, res)=>
  {
      const id = req.params.id;
      Project.findAll({include: [{model: db.student, where: {facultyId: id}, group: ['projectId']}, {model: db.file, attributes:{exclude:['password']}}]}).then(d=>{res.send(d)});
  }