const User = require("../models/User");
const Noticia = require("../models/Noticia");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({message: 'Se necesitan todos los campos'})
    }

    const foundUser = await User.findOne({username}).exec()

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({message: 'Contraseña equivocada'})

    res.json(foundUser)
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public
const refresh = (req, res) => {

};

// @desc Logout
// @route POST /auth/logout
// @access Public
const logout = (req, res) => {

};

module.exports = {
  login,
  refresh,
  logout
};
