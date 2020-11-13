const { Meal } = require("../db/schema");

const CreateMeal = async (req, res) => {
  const body = req.body;
  const meal = new Meal({
    name: body.name,
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

const UpdateMeal = async (req, res) => {
  const body = req.body;
  const updatedMeal = await Meal.findByIdAndUpdate(
    req.params.meal_id,
    {
      name: body.name,
      date: body.date,
      totalCalories: body.totalCalories,
      totalProtein: body.totalProtein,
      totalCarbs: body.totalCarbs,
      totalFat: body.totalFat,
    },
    { upsert: true, new: true }
  );
  res.send(updatedMeal);
};

module.exports = {
  CreateMeal,
  RemoveMeal,
  GetMeal,
  UpdateMeal,
};
