const { User, Exercise, Meal, Profile } = require("../db/schema");
const jwt = require("jsonwebtoken");
const {
  checkPassword,
  generatePassword,
} = require("../middleware/PasswordHandler");

const GetDiary = async (req, res) => {
  const user = await User.findById(req.params.user_id).select("_id name");
  const exercises = await Exercise.find({ user_id: req.params.user_id });
  const meals = await Meal.find({ user_id: req.params.user_id });
  const profile = await Profile.find({ user_id: req.params.user_id });
  res.send({ user, exercises, meals, profile });
};

const CreateUser = async (req, res) => {
  try {
    const body = req.body;
    const password_digest = await generatePassword(body.password);
    const user = new User({
      name: body.name,
      email: body.email,
      password_digest,
    });
    user.save();
    res.send(user);
  } catch (error) {
    throw error;
  }
};

const SignInUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (
      user &&
      (await checkPassword(req.body.password, user.password_digest))
    ) {
      const payload = {
        _id: user._id,
        name: user.name,
      };
      res.locals.payload = payload;
      return next();
    }
    res.status(401).send({ msg: "Unauthorized" });
  } catch (error) {
    throw error;
  }
};

const RefreshSession = (req, res) => {
  try {
    const token = res.locals.token;
    res.send({ user: jwt.decode(token), token: res.locals.token });
  } catch (error) {
    throw error;
  }
};
