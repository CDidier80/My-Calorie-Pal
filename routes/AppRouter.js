const Router = require("express").Router();

const UserRouter = require("./UserRouter");
const MealRouter = require("./MealRouter");
const FoodRouter = require("./FoodRouter");
const ExerciseRouter = require("./ExerciseRouter");
const ProfileRouter = require("./ProfileRouter");

Router.use("/users", UserRouter);
Router.use("/meals", MealRouter);
Router.use("/food", FoodRouter);
Router.use("/exercise", ExerciseRouter);
Router.use("/profile", ProfileRouter);

module.exports = Router;
