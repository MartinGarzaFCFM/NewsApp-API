const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    lastNames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: String,
        required: "Usuario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
