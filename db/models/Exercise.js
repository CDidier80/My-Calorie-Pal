const { Schema } = require("mongoose");

module.exports = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    calsBurned: {
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
