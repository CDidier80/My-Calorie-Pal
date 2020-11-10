const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
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
