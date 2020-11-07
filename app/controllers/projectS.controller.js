const db = require("../models");
const Project = db.projectS;
const Op = db.Sequelize.Op;

exports.create = (req, res) => { // create a new project
    const project = {
        name: req.body.name,
        studentId: req.body.studentId
    };
    Project.create(project).then(data => { res.status(201).send(data) }).catch(res.status(298))
};

exports.findStatus = (req, res) => { // return list status
    const Status = db.status;
    Status.findAll().then(d => res.status(298).send(d))
}


exports.findAll = (req, res) => { // find all projects with files
    Project.findAll({
        include: {
            model: db.file,
            attributes: ['id', 'type', 'name', 'projectId', 'main']            
        }
    }).then(data => { res.status(298).send(data) });
}

exports.findByStudent = (req, res) => { // find project by student id
    id = req.params.id;
    Project.findOne({ where: { studentId: id } }).then(data => { res.status(298).send(data) }).catch(e => { res.status(299) });
}


exports.findByTeacher = (req, res) => { // return list account->student->project->file
    id = req.params.id;
    db.account.findAll({
        where: { type: 'student' },
        attributes:['id','firstName', 'lastName', 'email', 'phone'],
        include: [
            {
                model: db.student,
                attributes:['id', 'trendId'],
                required: true,
                include: [
                    {
                        model: db.project,
                        attributes:['id', 'dataUpdate', 'name', 'statusId'],
                        include: [
                            {
                                model: db.file,
                                attributes: ['id', 'type', 'name', 'projectId', 'main'],
                                required: false
                            }
                        ]
                    }
                ]
            }
        ]
    }).then(d=>{
        res.status(298).send(d);
    })
}

exports.addOne = (req, res) =>{ // call func from router
    Project.increment(
        { statusId: +1 },
        { where: { id: req.params.id } }
    ).then(d => { res.send(d) }).catch(e => { res.status(299) });
}


exports.plusOne = (req, res) => { // call func from more controller
    Project.increment(
        { statusId: +1 },
        { where: { id: req.body.projectId } }
    ).then(d => { res.status(204) }).catch(e => { res.status(299) });
}

exports.delete = (req, res) => { //delete project
    const id = req.params.id;
    Project.destroy({ where: { id: id } }).then(d => { res.send("delete") }).catch(e => { res.status(299).send(e) })
}

exports.update = (req, res) => { // update project
    const id = req.params.id;
    Project.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) {
            res.send("updae");
        } else {
            res.status(299).send('id dont found');
        }
    })
        .catch(e => { res.status(299).send(e) })
}