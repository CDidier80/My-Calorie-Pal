const { Exercise } = require("../db/schema");

const CreateExercise = async (req, res) => {
  const body = req.body;
  const exercise = new Exercise({
    description: body.description,
    calsBurned: body.calsBurned,
    activityLevel: body.activityLevel,
    duration: body.duration,
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

const GetExercise = async (req, res) => {
  const exercise = await Exercise.findById(req.params.exercise_id);
  res.send({ exercise });
};

module.exports = {
  CreateExercise,
  RemoveExercise,
  GetExercise,
};
