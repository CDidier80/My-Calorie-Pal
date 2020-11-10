const { Meal } = require("../db/schema");

const CreateMeal = async (req, res) => {
  const body = req.body;
  const meal = new Meal({
    description: body.description,
    user_id: req.params.user_id,
  });
  meal.save();
  res.send(meal);
};

const RemoveMeal = async (req, res) => {
  await Meal.deleteOne({ _id: req.params.meal_id });
  res.send("deleted");
};

module.exports = {
  CreateMeal,
  RemoveMeal,
};
