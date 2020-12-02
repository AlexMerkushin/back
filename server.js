const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
global.__basedir = __dirname;
var corsOptions = {
  origin: true
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const { request } = require("express");

//add a defult dat for a table
//force is start database from new
db.sequelize.sync({ force: true, }).then(() => {

  const faculty = require("./app/models/data/faculty.js");
  db.faculty.bulkCreate(faculty, { validate: true });



  const Account = require("./app/models/data/account.js");
  db.account.bulkCreate(Account, { validate: true })
  .then(()=>{
    const College = require("./app/models/data/college.js");
    db.college.bulkCreate(College, { validate: true });

    const Mentor = require("./app/models/data/mentor");
    db.mentor.bulkCreate(Mentor, {validate: true});

    const Student = require("./app/models/data/student");
    db.student.bulkCreate(Student, {validate: true});
    
  })




 


})


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/account.routes.js")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/college.routes.js")(app);
//require("./app/routes/headFaculty.routes")(app);
require("./app/routes/faculty.routes")(app);
require("./app/routes/project.routes")(app);

require("./app/routes/mentor.routes.js")(app);

require("./app/routes/file.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
