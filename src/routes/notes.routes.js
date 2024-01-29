const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const notesRoutes = new Router(); 
const notesController = new NotesController();

notesRoutes.get("/", notesController.index);
notesRoutes.get("/:id", notesController.show);
notesRoutes.post("/", notesController.create);
notesRoutes.delete("/:id", notesController.delete);

module.exports = notesRoutes;