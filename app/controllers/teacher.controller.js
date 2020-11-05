const db = require("../models");
const Teacher = db.teacher;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { // create a new teacher
    const teacher = {
        out: req.body.out,
        adocation: req.body.adocation,
        accountId: req.body.accountId,
        collegeId: req.body.collegeId
    };
    const Account = require("./account.controller.js");
    Account.create(req,res).then(()=>{ //new accout
        Teacher.create(teacher).then(d => { res.status(201).send(d) }).catch(e => { res.status(299).send(e) });
    }).catch(e => { res.status(299).send(e) });
    
}

exports.findByPk = (req, res) => { // find teacher by id 
    const id = req.body.id;
    Teacher.findByPk(id).then(d => { res.status(298).send(d) }).catch(e=>{res.status(299).send(e)})
}
exports.findByCollege = (req, res) => { // return list teacher who work in college
    const id = req.params.id;
    Teacher.findAll({ where: { collegeId: id } }).then(data => { res.status(298).send(data) }).catch(e=>{res.status(299).send(e)});
}

exports.findAll = (req, res) => { //find all teacher
    Teacher.findAll().then(d => { res.send(d) })
}


exports.update = (req, res) => { //update teacher
    const accountId = req.params.accountId;
    Teacher.update(req.body, { where: { accountId: accountId } }).then(d => { res.send(d) }).catch(res.send('e'))
}

exports.findOne = (req, res) =>{ // find by account id
    const id = req.params.id;
    Teacher.findOne({where: {accountId: id}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)});
}