const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

/*
    יצירת סטודנט חדש
*/
exports.create = async (req, res, next) => {  //create a new student


    try {
        await Student.upsert(req.body.student);
        next();
    } catch (error) {
        res.status(404).send("canot create new account");
    }

}

/*
    עדכון של סטודנט לפי מספר זהות
*/
exports.update = async (req, res)=>{ 
    const accountId = req.params.accountId;
    //res.status(200).send(req.body);
    await db.account.update(req.body, {where: {accountId: accountId}});
    Student.update(req.body.student, {where: {accountId: accountId}}).then(row=>{
      res.status(200).send(`update ${row} rows`);
    }).catch(error=>{
      res.status(404).send(error);
    })
}



/*
    מציאת סטודנט לפי מספר מגמה 
*/
exports.findByFacultyId = (req, res) => {
    const accountId = req.params.accountId;

    db.faculty.findOne({ where: { accountId: accountId }, attributes: ['id'] }).then(result => {
        db.account.findAll({ include: [{ model: db.student, where: { facultyId: result.id } }], attributes: { exclude: ["password"] } }).then(result => {
            res.send(result);
        })
    })

}



/*
    הפונקציה מוציאה את כל הסטודנטים המקשורים לפרויקט ומוסיפה את כולם מחדש
*/
exports.addStudentToProject = async (req, res) => {
    const accountId1 = req.params.accountId1,
        accountId2 = req.params.accountId2,
        accountId3 = req.params.accountId3;
    await Student.update({ projectId: null }, { where: { projectId: req.body.projectId } });
    Student.update(req.body, { where: { accountId: [accountId1, accountId2, accountId3] } }).then(sum => {
        res.status(200).send(sum);
    })

}

/*
    הפונקציה מחזירה מידע סטטיסטי לפי מגמה 
    הסטיסטיקה:
    מגמה, ראש מגמה, ממוצע ציונים, סטודנטים במגמה, סטודנטים עם פרויקט, סטודנטים עם ציון, ציון מינימום, ציון מקסימום
*/
exports.
stat = (req, res) => {

    db.faculty.findAll({raw: true,group: ['facultyId'], include:[{model:db.student, attributes: [
        [sequelize.fn('avg', sequelize.col('gradeProject')), 'avg'],
        [sequelize.fn('count', sequelize.col('students.accountId')), 'count'],
        [sequelize.fn('count', sequelize.col('projectId')), 'studentWithProject'],
        [sequelize.fn('count', sequelize.col('gradeProject')), 'studentWithGrade'],
        [sequelize.fn('min', sequelize.col('gradeProject')), 'minGrade'],
        [sequelize.fn('max', sequelize.col('gradeProject')), 'maxGrade']
    ]}]}).then(ress=>res.send(ress))

    /*
    Student.findAll(
        {
            group:'facultyId',
            attributes: [
                [sequelize.fn('avg', sequelize.col('gradeProject')), 'avg'],
                [sequelize.fn('count', sequelize.col('accountId')), 'count'],
                [sequelize.fn('count', sequelize.col('projectId')), 'studentWithProject'],
                [sequelize.fn('count', sequelize.col('gradeProject')), 'studentWithGrade'],
                [sequelize.fn('min', sequelize.col('gradeProject')), 'minGrade'],
                [sequelize.fn('max', sequelize.col('gradeProject')), 'maxGrade']
            ]
        }).then(d => {
            res.send(d);
        })
        */
}

/*
    הפונקציה מחזירה מידע סטיסטי על מגמה לפי מספר מגמה
הסטיסטיקה:
    מגמה, ראש מגמה, ממוצע ציונים, סטודנטים במגמה, סטודנטים עם פרויקט, סטודנטים עם ציון, ציון מינימום, ציון מקסימום
*/
exports.statByFaculty = (req, res) => {
    const accountId = req.params.accountId;
    db.faculty.findOne({ where:{ accountId: accountId}, attributes:['id', 'name'], raw: true,
        include: [{
            model: db.student,
            attributes: [
                [sequelize.fn('avg', sequelize.col('gradeProject')), 'avg'],
                [sequelize.fn('count', sequelize.col(`students.accountId`)), 'count'],
                [sequelize.fn('count', sequelize.col('projectId')), 'studentWithProject'],
                [sequelize.fn('count', sequelize.col('gradeProject')), 'studentWithGrade'],
                [sequelize.fn('min', sequelize.col('gradeProject')), 'minGrade'],
                [sequelize.fn('max', sequelize.col('gradeProject')), 'maxGrade'],
            ]
        }]
    }).then(result => {
        res.send(result);
    }).catch(error => {
        res.status(404).send(error)
    })
}

