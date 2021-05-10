/* Creating the routes for my app in this file which is
   seperate from myServer.js. */

const express = require("express");
const router = express.Router();
const fileHandler = require("fs");
// const { writeFile } = require("node:fs");

/* Parsing the webProjects.json file so that I can use the objects within
   the application/server. */

const projectContent = JSON.parse(
  fileHandler.readFileSync("./webProjects.json")
);

/* Creating a function to generate an ID. */

const generateId = () => {
  return Math.floor(Math.random() * Date.now());
};

/* Adding the different routes available on my Express server. */

/* Get route. */
router.get("/", (req, res) => {
  fileHandler.readFile("webProjects.json", (err, data) => {
    if (err) res.send("File not found.");
    else res.send(projectContent);
  });
});

/* POST Route. */
router.post("/add", (req, res) => {
  const id = generateId();
  /* Creating a new object and I am assigning an Id to the new object
     as well as the information received form req.body. */
  const newProject = Object.assign({ id }, req.body);
  projectContent.push(newProject);
  console.log(projectContent);

  /* Creating a function which I can pass into the 'writeFile' module that I am using to write to the 
   webProjects.json file. */

  function completed() {
    console.log("Project added!");
  }

  /* Creating a variable to store my web Projects and am setting them to be in JSOn string format and I am adding 
   spacing so that the data does not get writted on one long line in the file but each entry gets displayed on a new line. */

  let myData = JSON.stringify(projectContent, null, 2);
  fileHandler.writeFile("./webProjects.json", myData, completed);

  return res.json({
    message: "New project added!",
    projectContent,
  });
});

/* DELETE method. */

router.delete("/delete/:id", (req, res) => {
  const id = Number(req.params.id);

  for (let i = 0; i < projectContent.length; i++) {
    if (projectContent[i].id === id) {
      projectContent.splice(i, 1);
    }
  }

  /* Creating a function which I can pass into the 'writeFile' module which I am using to write the updated/changes
     to the webProjects.json file. */

  function updated() {
    console.log("Project deleted!");
  }

  /* Creating a variable to store my web Projects and am setting them to be in JSON string format and I am adding 
   spacing so that the data does not get written on one long line in the file but each entry gets displayed on a new line. */

  let updatedProjects = JSON.stringify(projectContent, null, 2);
  fileHandler.writeFile("./webProjects.json", updatedProjects, updated);

  return res.json({
    message: "Project deleted.",
    projectContent,
  });
});

/* PUT method. */

router.put("/update/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedProject = Object.assign({ id }, req.body);

  for (i = 0; i < projectContent.length; i++) {
    if (projectContent[i].id === id) {
      projectContent[i] = updatedProject;
    }
  }

  /* Creating a function which I can pass into the 'writeFile' module which I am using to write the updated/changes
     to the webProjects.json file. */

  function updatingItems() {
    console.log("Entry has been updated!");
  }

  /* Creating a variable to store my web Projects and am setting them to be in JSON string format and I am adding 
   spacing so that the data does not get written on one long line in the file but each entry gets displayed on a new line. */

  let updatedItem = JSON.stringify(projectContent, null, 2);
  fileHandler.writeFile("./webProjects.json", updatedItem, updatingItems);

  return res.json({
    message: "Project updated!",
    projectContent,
  });
});

/* Exporting the router module. */

module.exports = router;
