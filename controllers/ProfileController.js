const { Profile } = require("../db/schema");

const CreateProfile = async (req, res) => {
  await Profile.deleteOne({ user_id: req.params.user_id });

  const body = req.body;
  const profile = new Profile({
    gender: body.gender,
    age: body.age,
    height: body.height,
    weight: body.weight,
    goalWeight: body.goalWeight,
    weeklyGoal: body.weeklyGoal,
    activityLevel: body.activityLevel,
    recCalIntake: body.recCalIntake,
    user_id: req.params.user_id,
  });
  profile.save();
  res.send(profile);
};

const GetProfile = async (req, res) => {
  const profile = await Profile.findOne({ user_id: req.params.user_id });
  res.send({ profile });
};

module.exports = {
  CreateProfile,
  GetProfile,
};
