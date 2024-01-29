const { Router } = require("express");
const UsersController = require("../controllers/UsersController");

const userRoutes = new Router();
const usersController = new UsersController();

userRoutes.post("/", usersController.create);
userRoutes.put("/", usersController.update);

module.exports = userRoutes;