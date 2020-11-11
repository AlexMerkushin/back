const fs = require('fs');
const db = require("../models");
const Mentor = db.mentor;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {  //create a new mentor
    
    const mentor={
    accountId: req.body.accountId,
    Education: req.body.education,
    WorkLocation: req.body.workLocation
};
const Account = require("./account.controller.js");
 Account.create(req,res).then(()=>{ //new account
     Mentor.create(mentor) // new mentor
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

exports.update = (req, res)=>{ //update the mentor 
    const accountId = req.params.accountId;
    Mentor.update(req.body, {where:{accountId:accountId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findFreelancer = (req, res)=> {
    Mentor.findAll({where: {WorkLocation: {[Op.ne]: null}}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findById = (req, res)=>{
    const accountId = req.params.accountId;
    Mentor.findOne({where: {accountId: accountId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.uploadResume = (req, res) => { // upload a new file
  const accountId = req.params.accountId;
  Mentor.findOne({where: {accountId: accountId}}).then(mentor=>{
  mentor.update({
    resumeExtension: req.file.mimetype,
    resumeName: req.file.originalname,
    resume: req.file.buffer // conver to blob file
  },
  )}).then((file) => {
    try {
      // exit node.js app
      res.status(201).send("הצלחת"); // return data project
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })
};

exports.uploadCertificate = (req, res) => { // upload a new file
  const accountId = req.params.accountId;
  Mentor.findOne({where: {accountId: accountId}}).then(mentor=>{
  mentor.update({
    certificateExtension: req.file.mimetype,
    certificateName: req.file.originalname,
    certificate: req.file.buffer // conver to blob file
  },
  )}).then((file) => {
    try {
      // exit node.js app
      res.status(201).send("הצלחת"); // return data project
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })
};