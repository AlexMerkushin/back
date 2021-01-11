const db = require("../models");
const Faculty = db.faculty;
const Op = db.Sequelize.Op;

/*
  יצירת מגמה חדשה
*/
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

  /*
  עדכון של מגמה
  */
  exports.update = (req, res)=>{ //update the faculty 
    const facultyId = req.params.facultyId;
    Faculty.update(req.body, {where:{id:facultyId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
  };


/*
  הפונקציה מחזירה את כל המגמות + מידע של ראשי מגמות
*/
exports.findAllFaculties = (req, res)=> {
  Faculty.findAll({include: [{model: db.account, attributes: { exclude: ["password"] }}], attributes:['id', 'name']}).then(d=>{res.status(298).send(d)}).catch({msg: "error"})
};
