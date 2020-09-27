const db = require("../models");
const Trend = db.trend;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {// Create a test
  const trend = {
    name: req.body.name
  };
  Trend.create(trend)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(299).send("שגיאה בהוספת נתונים");
    });
};

exports.findAll = (req, res) => {//find all trends
  Trend.findAll()
    .then(data => {
      res.status(298).send(data);
    })
    .catch(err => {
      res.status(299).send("שגיאה");
    });
};

exports.findByPk = (req, res) => {//find trend by id 
  const id = req.params.id;
  Trend.findByPk(id)
    .then(data => {
      res.send(data)
    })
};


exports.update = (req, res) => { //update trend
  const id = req.params.id;

  Trend.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "update " + num +" rows" 
        });
      } else {
        res.send({
          message: "dont empty"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "dont working"
      });
    });
};

exports.delete=(req, res) =>{ //delte trend
  id = req.params.id;
  Trend.destroy(
    {
      where: { id: id }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "delete"
        });
      } else {
        res.send({
          message: `dont found`
        });
      }
    })
    .catch(err => {
      res.status(299).send("שגיאה במחיקה. נא לוודא שלא קיימים תלמידים במגמה זו");
    });
}