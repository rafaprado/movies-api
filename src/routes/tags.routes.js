const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsRoutes = new Router();
const tagsController = new TagsController();

tagsRoutes.delete("/:id", tagsController.delete);

module.exports = tagsRoutes;