const db = require("../models");
const Faculty = db.faculty;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {// Create a faculty
    const faculty = {
      name: req.body.name,
      accountId: req.body.accountId
    };
    Faculty.upsert(faculty)
      .then(data => {
        db.account.findByPk(data.accountId, { include: [{model: db.faculty}], attributes:{exclude:['password']} }).then(user => {
          res.send(user)
        })
      })
      .catch(err => {
        res.status(299).send("שגיאה בהוספת נתונים");
      });
  };

  exports.update = (req, res)=>{ //update the faculty 
    const facultyId = req.params.facultyId;
    Faculty.update(req.body, {where:{id:facultyId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
  };


  exports.deleteFaculty = (req, res)=> {
    const facultyId = req.params.facultyId;
    Faculty.destroy({where: {id: facultyId}}).then(d=>{
        if (d)
        {
            res.send("נמחק");
        }
        else
        {
          res.send("לא נמצא")
        }
      }).catch(e=>{res.status(299).send(e)})
};


exports.findAllFaculties = (req, res)=> {
  Faculty.findAll({include: [{model: db.account, attributes: { exclude: ["password"] }}], attributes:['id', 'name']}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
};

  exports.findByHeadFacultyId = (req, res)=>{
    const accountId = req.params.accountId;
    Faculty.findOne({where: {accountId: accountId}}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
}

  exports.findByFacultyId = (req, res)=> {
      const facultyId = req.params.facultyId;
      Faculty.findOne({where: {id: facultyId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
  };