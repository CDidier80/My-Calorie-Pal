const Router = require("express").Router();
const MealController = require("../controllers/MealController");

Router.post("/:user_id", MealController.CreateMeal);
Router.delete("/:meal_id", MealController.RemoveMeal);
Router.get("/:meal_id", MealController.GetMeal);
Router.put("/:meal_id", MealController.UpdateMeal);
Router.get("/get/:user_id/:date", MealController.GetPreviosMeals);
Router.post("/recreate/:user_id", MealController.RecreateMeal);

module.exports = Router;
