const Router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");

Router.get("/:user_id", ProfileController.GetProfile);
Router.post("/create/:user_id", ProfileController.CreateProfile);

module.exports = Router;
