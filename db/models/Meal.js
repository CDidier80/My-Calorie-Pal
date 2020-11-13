const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    totalCalories: {
      type: Number,
      required: false,
    },
    totalProtein: {
      type: Number,
      required: false,
    },
    totalCarbs: {
      type: Number,
      required: false,
    },
    totalFat: {
      type: Number,
      required: false,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "foods",
      },
    ],
  },
  { timestamps: true }
);
