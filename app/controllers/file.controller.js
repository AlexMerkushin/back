const fs = require('fs');

const db = require("../models");
const File = db.file

/*
  פונקציה להעלאת קבצים לטבלת קבצים
  הפונקציה מחזירה מידע בסיסי על הקובץ
*/
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

/*
  עדכון של שורה בטבלת קבצים
*/
exports.update = (req, res)=>{ //update the file 
  const fileId = req.params.fileId;
  File.update(req.body, {where:{id:fileId}}).then(d=>{res.send(d)}).catch(e=>{res.status(299).send(e)})
}




/*
  הורדת קובץ לפי מספר הקובץ
*/
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