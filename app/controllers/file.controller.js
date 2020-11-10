const fs = require('fs');

const db = require("../models");
const File = db.file

/*exports.upload = (req, res) => { // upload a new file
  File.create({
    Extension: req.file.mimetype,
    name: req.file.originalname,
    file: req.file.buffer, // conver to blob file
    projectId: req.body.projectId,
    type: req.body.type
  }).then((file) => {
    try {
      // exit node.js app
      res.status(201).send({
        id: file.id,
        name: file.name,
        type: file.type,
        createAt: new Date().toLocaleString()
      }); // return data project
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })

};

exports.deleteOne = (req, res) => { //delete files on project
  const id = req.params.id;
  const Project = db.project;
  File.findByPk(id).then(file => { 
    if (file) { // file is find
      Project.findByPk(file.projectId).then(project => { // find the peoject
        if (project) { //project find
          if (project.statusId < 5 && file.main == 0) { // validate acction
            file.destroy().then(() => { // delete file
              project.update({ statusId: 2 }).then(()=>{ //update a new value to project status
                res.send('2');
              }).catch(e => { res.status(299).send(e) });
            }).catch(e => {
              res.status(299).send("error");
            });
          }
          else
            if(project.statusId == 6 && file.main == 1) //validate action
            {
              file.destroy().then(() => { //delete 
                project.update({ statusId: 5 }).then(()=>{ //update a new value to project status
                  res.status(298).send('5');
                }).catch(e => { res.status(299).send(e) });
              }).catch(e => {
                res.status(299).send("error");
              });
            }
        }
        else {
          res.status(299).send("dont found!");
        }
      }).catch(e => {
        res.status(299).send("error");
      });
    }
    else {
      res.status(299).send("dont found!");
    }
  }).catch(e => {
    res.status(299).send("error");
  });
}*/

exports.deleteOne = (req, res)=>{
  const fileId = req.params.fileId;
    File.destroy({ where: { id: fileId } }).then(file => {
      if (file == 1) res.send("נמחק בהצלחה");
      else res.status(299).send("לא נמצאו רשומות למחיקה");
    }).catch(e => { res.status(299).send("שגיאה לא ידועה") });
}

exports.findByProject = (req, res) => { // find file by project Id
  const id = req.params.id;
  File.findAll({ where: { projectId: id }, attributes: ['id', 'name', 'main', 'type', 'createAt'] }).then(d => { res.status(298).send(d) }).catch(e => { res.status(299).send(e) });
}


exports.getFileById = (req, res) => { // get file by project id + file id
  const id = req.params.id, projectId = req.params.projectId;
  File.findOne({ where: { id: id, projectId: projectId } }).then(file => {
    if (file) {
      var fileData = new Buffer.from(file.data);// write buffer to file
      res.write(fileData);
      res.end();
    }
    else
      res.status(299).send("0 rows");

  })
    .catch(e => { res.status(299).send("error!") });
}

exports.upload = (req, res) => { // upload a new file
  File.create({
    Extension: req.file.mimetype,
    name: req.file.originalname,
    file: req.file.buffer, // conver to blob file
    projectId: req.body.projectId,
    type: req.body.type
  }, {
    fields: ['id', 'Extension', 'name', 'type', 'createAt']
}).then((file) => {
    try {
      // exit node.js app
      res.status(201).send(file); // return data project
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })

};