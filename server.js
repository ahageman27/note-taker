const express = require("express");
const path = require("path");
const noteData = require("./db/db.json");

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", (req, res) => {
  res.json(noteData);
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(noteData));

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note.`);
  const {title, text} = req.body

  if (title && text) {
    const newNote = {
      title,
      text,
    };

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);

  } else {
    res.status(500).json("Request body must contain a title and a body.");
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
