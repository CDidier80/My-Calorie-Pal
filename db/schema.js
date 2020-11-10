const { model } = require("mongoose");

const UserSchema = require("./models/User");
const MealSchema = require("./models/Meal");
const FoodSchema = require("./models/Food");
const ExerciseSchema = require("./models/Exercise");
const ProfileSchema = require("./models/Profile");

const User = model("users", UserSchema);
const Meal = model("meals", MealSchema);
const Food = model("foods", FoodSchema);
const Exercise = model("exercises", ExerciseSchema);
const Profile = model("profiles", ProfileSchema);

module.exports = {
  User,
  Meal,
  Food,
  Exercise,
  Profile,
};
