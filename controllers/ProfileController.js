const { Profile } = require("../db/schema");

const CreateProfile = async (req, res) => {
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

const UpdateProfile = async (req, res) => {
  const body = req.body;
  const updatedProfile = await Profile.findByIdAndUpdate(
    req.params.profile_id,
    {
      gender: body.gender,
      age: body.age,
      height: body.height,
      weight: body.weight,
      goalWeight: body.goalWeight,
      weeklyGoal: body.weeklyGoal,
      activityLevel: body.activityLevel,
      recCalIntake: body.recCalIntake,
    },
    { upsert: true, new: true }
  );
  res.send(updatedProfile);
};

module.exports = {
  CreateProfile,
  UpdateProfile,
};
