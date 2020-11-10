const Router = require("express").Router();
const MealController = require("../controllers/MealController");

Router.post("/:user_id", MealController.CreateMeal);
Router.delete("/:meal_id", MealController.RemoveMeal);

module.exports = Router;
