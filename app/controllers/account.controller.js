const db = require("../models");
const { account } = require("../models");
const Account = db.account;
const Op = db.Sequelize.Op;

/*
  הפונקציה יוצרת שורה חדשה בטבלת משתמשים, הסיסמא היא אקראית ושאר הנתונים נשלחים 
*/
exports.createUser = async (req, res, next)=>{
  var pass = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$*';
  var charactersLength = characters.length;
  var length = Math.floor(Math.random() * 10) + 6;
  for (var i = 0; i < length; i++) {
    pass += characters.charAt(Math.floor(Math.random() * charactersLength));
  }


  const account = {
    accountId: req.body.accountId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    sex: req.body.sex,
    password: pass,
    phone: req.body.phone,
    type: req.body.type,
    addres: req.body.addres
  };

  try {
    await Account.upsert(account);
    const mail = require("./mail.controller.js");
    mail.sendMail(account.email, "הרשמתך למהט אושרה בהצלחה!", "פרטי ההתחברות הם המספר זהות שלך + סיסמא  "+ pass); // send mail to new user with password
    next();
  } catch (error) {
    res.status(404).send("canot create new account");
  }

}


/*
  הפונקציה מעדכנת משתמש לפי מספר זהות וסיסמא
*/
exports.update = (req, res) => {
  const accountId = req.params.accountId;
  const password = req.params.pass;
  Account.findByPk(accountId).then(account => { //find by id 
    if (account) { // if found it
      const bcrypt = require('bcrypt');
      bcrypt.compare(password, account.password, (err, data) => { // check the pasword
        if (err) res.status(299).send("שגיאה לא ידועה" + err);
        if (data) { // if data is true so password is good
          account.update(req.body).then(() => { // update account
            res.send("עודכן בהצלחה");
          }).catch(() => {
            res.status(299).send("שגיאה בעדכון");
          })
        }
        else res.status(299).send("פרטי זיהוי שגויים");
      })
    }
    else res.status(299).send("פרטי זיהוי שגויים");
  }).catch(e => { res.status(298).send("שגיאה לא ידועה") });
};

/*
  הפונקציה מעדכנת את החשבון לפי מספר זהות
*/
exports.updateAccount = (req, res) => {
  const accountId = req.params.accountId;
  Account.update(req.body, {where: {accountId: accountId}}).then(row=>{
    res.send(`row ${row} update`);
  }).catch(error=>{
    res.status(404).send(error);
  })
}

/*
  הפונקציה מחזירה את כל החשבונות ומקשרת טבלאות רלוונטיות [סטודנט, מנחה]
*/
exports.findAll = (req, res) => {
  Account.findAll({include:[{model: db.student, attributes: ['projectId', 'facultyId', 'gradeProject', 'finishDate']}, {model: db.mentor, attributes: ['Education', 'WorkLocation', 'resumeName', 'certificateName']}], attributes: { exclude: ["password"] } }).then(account => {
    res.status(298).send(account);
  }).catch(e => {
    res.status(299).send(שגיאה);
  })
}

// פונקציה של התחברות , מחזירה טוקן רלוונטי למשתמש
exports.login = (req, res) => {
  const accountId = req.body.accountId;
  const password = req.body.pass;

  Account.findByPk(accountId).then(user => {
    const bcrypt = require('bcrypt');
    bcrypt.compare(password, user.password, (err, data) => { // בדיקה של סיסמא עם הצפנה
      if (err) res.status(404).send("שגיאה לא ידועה" + err); 
      else if (data) { // במידה והסיסמא נכונה
        const jwt = require('jsonwebtoken'); //ספריה ליצירת טוקן
        const token = jwt.sign({  // יצירת טוקן עם מספר זהות וסוג המשתמש
          accountId: user.accountId,
          type: user.type
        }, 'access_token', {expiresIn: "1H"}) // יצירת טוקן לשעה
        res.send({meesege: "succses", token});
      }
      else res.status(401).send("bad pass")
    })
  })
};

/*
  הפונקציה מחזירה את כל המשתמשים לפי סוג המשתמש
*/
exports.findAllByType = (req, res) => { // find all account with same type
  const type = req.params.type;
  Account.findAll({ where: { type: type }, attributes: { exclude: ["password"] } }).then(accounts => {
    res.status(298).send(accounts);
  }).catch(() => {
    res.status(299).send("לא נמצאו רשומות תואמות");
  })
}


exports.forgetPassword = (req, res)=>{
  try {
    Account.findOne({where:{ accountId: req.body.accountId, email: req.body.email}}).then(user=>{
      if (user){ //חשבון נמצא 
        const jwt = require('jsonwebtoken'); //ספריה ליצירת טוקן
        const token = jwt.sign({  // יצירת טוקן עם מספר זהות וסוג המשתמש
          accountId: user.accountId
        }, 'access_token', {expiresIn: "2M"}) // יצירת טוקן לרבע שעה
        
    const mail = require("./mail.controller.js");
    const msg = '<p>Click <a href="http://localhost:3000/token?token=' + token + '">here</a> to reset your password</p>';// `<span><a href='localhost:3000/token?token=${token}'>לחץ כאן</a> לאיפוס סיסמתך </a>`
    mail.sendMail(req.body.email, "קישור ליצירת סיסמא חדשה", msg); // send mail to new user with password
        res.send({meesege: "succses", token});
      }
      else res.send({meesege: "משתמש לא קיים!"});
      
  })
  } catch (error) {
    res.status(500).send(error)
  }
  
}

/*
  הפונקציה מחזירה מידע על המשתמש לפי הטוקן ששלחנו אליה
*/
exports.user = (req, res) => {
  try {
    const jwt = require('jsonwebtoken');
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, 'access_token');
    Account.findByPk(data.accountId, {include: [{model: db.student, attributes: { exclude: ['password']}}]}).then(d=>{res.send({user: d})});
  } catch (error) {
    res.status(404).send("auth faild");
  }
}

/*
  הפונקציה מחזירה מידע על משתמש לפי המספר זהות שלו
*/
exports.findById = (req, res) =>{
  try {
    Account.findByPk(req.params.accountId, {include:[{model: db.student}, {model: db.mentor}], attributes: { exclude: ["password"] }}).then(d=>{res.send(d)});
  } catch (error) {
    res.status(404).send("auth faild");
  }
}