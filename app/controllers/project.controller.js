const { sequelize, project } = require("../models");
const db = require("../models");
const Project = db.project;
const Op = db.Sequelize.Op;
/*
    הפונקציה מקבלת פרטים ויוצרת רשומה חדשה בטבלת פרויקטים
    הפונקציה מחזירה את הפרויקט שנוצר
*/
exports.create = (req, res) => { // create a new project
    const project = {
        name: req.body.name,
        mentorAccountId: req.body.mentorAccountId
    };
    const studentId = req.body.studentId;
    Project.create(project).then(data => {
        db.student.update({ projectId: data.id }, { where: { accountId: studentId } });
        Project.findByPk(data.id, {include: [{model: db.file}]}).then(resultProject => { res.status(201).send(resultProject) })
        //res.status(201).send(data)
    }).catch(res.status(298))
};

/*
    עדכן פרויקט לפי מספר זיהוי
*/
exports.update = (req, res) => { //update the mentor 
    const id = req.params.projectId;
    Project.update(req.body, { where: { id: id } }).then(() => { Project.findByPk(id).then(result=>{res.status(200).send(result)}) }).catch(e => { res.status(299).send(e) })
}

/*
    הפונקציה מחזירה את כל הפרויקטים + הקבצים הרלוונטים שלהם
*/
exports.findAllProject = (req, res) => {
    Project.findAll({ include: [{ model: db.student, attributes: { exclude: ["projectId"] }, group: ['projectId'] }, { model: db.file, attributes: { exclude: ["file", "projectId"] } }] }).then(d => { res.status(298).send(d) }).catch({ msg: "error" })
}

/*
    הפונקציה מקבלת מספר זהות של מנחה ומחזירה את כל הפרויקטים והקבצים הרלוונטים לאותו מנחה
*/
exports.findByMentorId = (req, res) => {
    const accountId = req.params.accountId;
    Project.findAll({ where: { 	mentorAccountId: accountId }, include: [{ model: db.student, attributes: { exclude: ["projectId"] }, group: ['projectId'] }, { model: db.file, attributes: { exclude: ["file", "projectId"] } }] }).then(d => { res.send(d) }).catch({ msg: "error" })
}

/*
    הפונקציה מחזירה פרויקט לפי מספר הזהות
*/
exports.findByProjectId = (req, res) => {
    const id = req.params.projectId;
    Project.findByPk(id, {include: [{model: db.student }, { model: db.file }]}).then(d => { res.status(298).send(d) }).catch({ msg: "error" })
}

/*
    הפונקציה מחזירה פרויקט לפי מספר זהות של סטודנט
*/
exports.findByAccountId = (req, res) => {
    const accountId = req.params.accountId;
    Project.findOne({ include: [{ model: db.student, where: { accountId: accountId }, attributes: ['accountId'], required: true }, { model: db.file, attributes: { exclude: ['file', 'projectId'] } }] }).then(dd => res.send(dd));

}

/*
    פונקציה מחזירה את הפרויקטים המשוייכים לראש מגמה
*/
exports.findByHeadFacultyId = (req, res) => {
    const accountId = req.params.accountId;
    db.faculty.findOne({where: {accountId: accountId}}).then(result=>{
      //  res.send(result);
     Project.findAll({ include: [{model: db.student, where: {facultyId: result.id} }, { model: db.file }] }).then(d => { res.send(d) });
    })
    
}