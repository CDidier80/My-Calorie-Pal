const Router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");

Router.post("/:user_id", ProfileController.CreateProfile);
Router.put("/:profile_id", ProfileController.UpdateProfile);

module.exports = Router;
