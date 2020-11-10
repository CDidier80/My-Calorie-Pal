const { Exercise } = require("../db/schema");

const CreateExercise = async (req, res) => {
  const body = req.body;
  const exercise = new Exercise({
    description: body.description,
    calsBurned: body.calsBurned,
    date: body.date,
    user_id: req.params.user_id,
  });
  exercise.save();
  res.send(exercise);
};

const RemoveExercise = async (req, res) => {
  await Exercise.deleteOne({ _id: req.params.exercise_id });
  res.send("deleted");
};

module.exports = {
  CreateExercise,
  RemoveExercise,
};
