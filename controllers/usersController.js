const User = require("../models/User");
const Noticia = require("../models/Noticia");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select().lean(); //"-password"
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const {id} = req.params
  const user = await User.findById(id).lean().exec();

  if(!user)
  return res.send({message: "No hay usuario con ese id."})

  res.send(user)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  console.dir(req.body);
  const { names, lastNames, email, password, username, image, role } = req.body;

  //Confirm Data
  if (
    !names ||
    !lastNames ||
    !email ||
    !password ||
    !username ||
    !role
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  //Hash Password
  const hashedPwd = await bcrypt.hash(password, 10); //salt rounds

  const userObject = {
    names,
    lastNames,
    email,
    password: hashedPwd,
    username,
    image,
    role
  };

  //Create and Store new user
  const user = await User.create(userObject);

  if (user) {
    //Created
    res.status(201).json({ message: `New user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

const updateSelf = asyncHandler(async (req, res) => {
  const { id, names, lastNames, email, username, password, image } = req.body;

  if (
    !id ||
    !names ||
    !lastNames ||
    !email ||
    !username ||
    !password ||
    !image
  ) {
    return res.status(400).json({ message: "Se necesitan todos lo campos" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  const duplicate = await User.findOne({ username }).lean().exec();
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.names = names;
  user.lastNames = lastNames;
  user.email = email;
  user.username = username;
  user.image = image;

  if (password) {
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }

  const updatedUser = await user.save();

  const foundUser = await User.findOne({username}).exec()

  res.json(foundUser);
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  const { id, names, lastNames, email, username, password, image, role } = req.body;

  //Confirm Data
  if (
    !id ||
    !names ||
    !lastNames ||
    !email ||
    !username ||
    !role
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  //Check for duplicate
  const duplicate = await User.findOne({ username }).lean().exec();
  //Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  user.names = names;
  user.lastNames = lastNames;
  user.email = email;
  user.username = username;
  user.roles = role;
  user.image = image;

  if (password) {
    //Hash password
    user.password = await bcrypt.hash(password, 10); //salt rounds
  }

  const updatedUser = await user.save();

  res.json({ message: `${updatedUser.username} updated` });
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.params)
  const { id } = req.params;


  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  const noticias = await Noticia.findOne({ author: id }).lean().exec();
  if (noticias) {
    return res.status(400).json({ message: "User has assigned News" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const result = await user.deleteOne();

  const reply = `Username ${user.username} with ID ${user._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  updateSelf,
  getUser
};
