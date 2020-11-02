const db = require("../models");
const HeadFaculty = db.headFaculty;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {  //create a new headFaculty
    
    const headFaculty={
    accountId: req.body.accountId,
    facultyId: req.body.facultyId
};
const Account = require("./account.controller.js");
 Account.create(req,res).then(()=>{ //new account
    HeadFaculty.create(headFaculty) // new headFaculty
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
    HeadFaculty.update(req.body, {where:{accountId:accountId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findByfacultyId =  (req, res)=>{
    const facultyId = req.params.facultyId;
    HeadFaculty.findOne({where: {facultyId: facultyId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

exports.findById = (req, res)=>{
    const accountId = req.params.accountId;
    HeadFaculty.findOne({where: {accountId: accountId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}