const { Meal } = require("../db/schema");

const CreateMeal = async (req, res) => {
  const body = req.body;
  const meal = new Meal({
    description: body.description,
    date: body.date,
    user_id: req.params.user_id,
  });
  meal.save();
  res.send(meal);
};

const RemoveMeal = async (req, res) => {
  await Meal.deleteOne({ _id: req.params.meal_id });
  res.send("deleted");
};

const GetMeal = async (req, res) => {
  const meal = await Meal.findById(req.params.meal_id);
  res.send({ meal });
};

module.exports = {
  CreateMeal,
  RemoveMeal,
  GetMeal,
};
