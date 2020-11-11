const { Food, Meal } = require("../db/schema");

const CreateFood = async (req, res) => {
  const body = req.body;
  const food = new Food({
    description: body.description,
    calories: body.calories,
    protein: body.protein,
    carbs: body.carbs,
    fat: body.fat,
  });
  food.save();
  await Meal.updateOne(
    { _id: req.params.meal_id },
    {
      $push: {
        foods: food,
      },
    }
  );
  res.send(food);
};

const RemoveFood = async (req, res) => {
  await Food.deleteOne({ _id: req.params.food_id });

  const updatedMeal = await Meal.findByIdAndUpdate(req.params.meal_id, {
    $pull: {
      foods: req.params.food_id,
    },
  });
  res.send({ updatedMeal });
};

const GetFood = async (req, res) => {
  const food = await Food.findById(req.params.food_id);
  res.send({ food });
};

const UpdateFood = async (req, res) => {
  const body = req.body;
  const updatedFood = await Food.findByIdAndUpdate(
    req.params.food_id,
    {
      description: body.description,
      calories: body.calories,
      protein: body.protein,
      carbs: body.carbs,
      fat: body.fat,
    },
    { upsert: true, new: true }
  );
  res.send(updatedFood);
};

module.exports = {
  CreateFood,
  RemoveFood,
  GetFood,
  UpdateFood,
};
