const Router = require("express").Router();
const FoodController = require("../controllers/FoodController");

Router.post("/:meal_id", FoodController.CreateFood);
Router.delete("/:meal_id/remove/:food_id", FoodController.RemoveFood);
Router.get("/:food_id", FoodController.GetFood);
Router.put("/:food_id", FoodController.UpdateFood);

module.exports = Router;
