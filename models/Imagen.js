const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    filename: {
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
    profilePic: {
      data: Buffer,
      contentType: String
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
