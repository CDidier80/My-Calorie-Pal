const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    servingSize: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    protein: {
      type: Number,
      required: true,
    },
    carbs: {
      type: Number,
      required: true,
    },
    fat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
