const app = require("express").Router();

app.get("/notes", (req, res) => {
    res.json("/db/db.json")
});

app.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note.`);
  let response;

  if (req.title && req.text) {
    response = {
      status: "success",
      data: req.body,
    };
    res.json(`Note has been added!`);
  } else {
    res.json("Request body must contain a title and a body.");
  }
});
