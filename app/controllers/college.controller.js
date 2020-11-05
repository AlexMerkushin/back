const db = require("../models");
const College = db.college;
const Op = db.Sequelize.Op;

exports.create= (req, res)=>{ // crearte new college
const college = {
    name: req.body.name,
    addres: req.body.addres,
    phone: req.body.phone,
    email: req.body.email,
    accountId: req.body.accountId
};
const Account = require("./account.controller.js");
Account.create(req,res).then(()=>{ // create new account (manger college)
  College.create(college, {attributes: ['accountId', 'name', 'addres', 'phone', 'email']}) // create new college
    .then((data)=>{
        res.status(201).send(data)
    }).catch(e=>{
      res.status(299).send("שגיאה ביצירת")
    })
}).catch(e=>{res.status(299).send("שגיאה בהכנסת רשומה")});
    

}

exports.findAll = (req, res) => { // find al college  
    College.findAll()
      .then(data => {
        res.status(298).send(data);
      })
      .catch(err => {
        res.status(299).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


exports.findOne = (req, res)=>{ // find college by manger id 
    const id = req.params.id;
    College.findOne({where: {accountId: id}}).then(data=>{res.status(298).send({data})}).catch(err => {
        res.status(299).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    })}


    exports.findPk = (req, res ) =>{ // find college by id college
      const id = req.params.id;
      College.findByPk(id).then(d=>{res.status(298).send(
        {
          name: d.name,
          addres: d.addres,
          phone: d.phone,
          email: d.email
        })}).catch(e=>{res.status(299).send(e)})
    }

