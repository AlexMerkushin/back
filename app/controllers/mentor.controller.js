const db = require("../models");
const Mentor = db.mentor;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {  //create a new mentor
    
    const mentor={
    accountId: req.body.id,
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
    const id = req.params.id;
    Mentor.update(req.body, {where:{accountId:id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}

exports.findFreelancer = (req, res)=> {
    Mentor.findAll({where: {WorkLocation: {[Op.ne]: ""}}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}