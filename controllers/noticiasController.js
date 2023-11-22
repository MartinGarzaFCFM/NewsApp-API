const Noticia = require("../models/Noticia");
const asyncHandler = require("express-async-handler");

// @desc Get all users
// @route GET /users
// @access Private
const getAllNoticias = asyncHandler(async (req, res) => {
  const Noticias = await Noticia.find().select().lean();
  if (!Noticias?.length) {
    return res.status(400).json({ message: "No hay noticias" });
  }
  res.json(Noticias);
});

// @desc Create new user
// @route POST /users
// @access Private
const crearNoticia = asyncHandler(async (req, res) => {
  const { title, subtitle, category, body, image, author } = req.body

  const noticiaObject = {
    title,
    subtitle,
    category,
    body,
    image,
    author,
  };

  //Create and Store new user
  const noticia = await Noticia.create(noticiaObject);

  if (noticia) {
    //Created
    res.status(201).json({ message: `Nueva noticia "${title}" creada` });
  } else {
    res.status(400).json({ message: "Recibidos datos invalidos" });
  }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const actualizarNoticia = asyncHandler(async (req, res) => {});

// @desc Delete a user
// @route DELETE /users
// @access Private
const borrarNoticia = asyncHandler(async (req, res) => {});

module.exports = {
  getAllNoticias,
  crearNoticia,
  actualizarNoticia,
  borrarNoticia,
};


function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g,"");  
  var random = ("" + Math.random()).substring(2, 8); 
  var random_number = timestamp+random;  
  return random_number;
  }