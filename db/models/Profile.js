const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    goalWeight: {
      type: Number,
      required: true,
    },
    weeklyGoal: {
      type: String,
      required: true,
    },
    activityLevel: {
      type: String,
      required: true,
    },
    recCalIntake: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
