const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {  //create a new student
    
    const student={
    accountId: req.body.accountId,
    mentorId: req.body.mentorId,
    facultyId: req.body.facultyId,
    projectMId: req.body.projectMId,
    finishDate: req.body.finishDate,

    teacherId: req.body.teacherId,
    collegeId: req.body.collegeId,
    trendId: req.body.trendId
};
const Account = require("./account.controller.js");
 Account.create(req,res).then(()=>{ //new account
     Student.create(student) // new student
    .then((data)=>{
        res.status(201).send(data);
    })
    .catch(err => {
        res.status(299).send({err});
      });
 }).catch(err => {
    res.status(299).send({err});
  });
}

exports.update = (req, res)=>{ //update the student 
    const accountId = req.params.accountId;
    Student.update(req.body, {where:{accountId:accountId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findByFacultyId = (req, res) => {
    const facultyId = req.params.facultyId;
Student.findAll({where: {facultyId: facultyId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findByProjectId = (req, res) => {
    const projectMId = req.params.projectId;
    Student.findAll({where: {projectMId: projectMId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findByAccountId = (req, res)=>{//
    const accountId = req.params.accountId;
    Student.findOne({where: {accountId: accountId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}





