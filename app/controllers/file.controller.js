const fs = require('fs');

const db = require("../models");
const File = db.file


exports.upload = (req, res) => { // upload a new file
  File.create({
    Extension: req.file.mimetype,
    name: req.file.originalname,
    file: req.file.buffer, // conver to blob file
    projectId: req.body.projectId,
    type: req.body.type
  }
  ).then((file) => {
    try {
      // exit node.js app
      //res.status(201).send(file); // return data project
      File.findByPk(file.id, {attributes: { exclude: ["file", "projectId"] }}).then(file=>res.status(201).send(file))
    } catch (e) {
      console.log(e);
      res.status(299).send({ 'err': e });
    }
  }).catch(e => {
    res.status(299).send(e);
  })
};


exports.update = (req, res)=>{ //update the file 
  const fileId = req.params.fileId;
  File.update(req.body, {where:{id:fileId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}


exports.findByProjectId = (req, res) => { // find file by project Id
  const id = req.params.projectId;
  File.findAll({ where: { projectId: id } }).then(d => { res.status(200).send(d) }).catch(e => { res.status(299).send(e) });
}


exports.deleteOne = (req, res)=>{
  const fileId = req.params.fileId;
    File.destroy({ where: { id: fileId } }).then(file => {
      if (file == 1) res.send("נמחק בהצלחה");
      else res.status(299).send("לא נמצאו רשומות למחיקה");
    }).catch(e => { res.status(299).send("שגיאה לא ידועה") });
}


exports.findById = (req, res) => { // get file by file id
  const id = req.params.fileId;
  File.findOne({ where: { id: id} }).then(file => {
    if (file) {
      var fileData = new Buffer.from(file.file);// write buffer to file
      res.download(fileData)
    }
    else
      res.status(299).send("0 rows");

  })
    .catch(e => { res.status(299).send("error!") });
}