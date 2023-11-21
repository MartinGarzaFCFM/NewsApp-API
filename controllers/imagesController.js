const User = require("../models/User");
const Noticia = require("../models/Noticia");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const firebaseStorage = require("firebase/storage");
const storageRef = require("../config/firebaseConn");

// @desc Get all users
// @route GET /users
// @access Private
const getAllImages = asyncHandler(async (req, res) => {
  firebaseStorage
    .getDownloadURL(firebaseStorage.ref(storageRef, "whiteVtuber.png"))
    .then((url) => {
      res.json(url);
    });
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewImage = asyncHandler(async (req, res) => {
  const { filename, imagen } = req.body;
  const newRef = firebaseStorage.ref(storageRef, filename);

  firebaseStorage.uploadString(newRef, imagen, "data_url").then(snapshot => {
    return firebaseStorage.getDownloadURL(snapshot.ref)
  })
  .then(downloadURL => {
    res.json(downloadURL)
  });
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateImage = asyncHandler(async (req, res) => {});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteImage = asyncHandler(async (req, res) => {});

module.exports = {
  getAllImages,
  createNewImage,
  updateImage,
  deleteImage,
};
