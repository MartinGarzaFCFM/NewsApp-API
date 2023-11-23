const User = require("../models/User");
const Noticia = require("../models/Noticia");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Imagen = require("../models/Imagen");

const getAllImages = asyncHandler(async (req, res) => {
  const content = await Imagen.find().select().lean(); //"-password"
  if (!content?.length) {
    return res.status(400).json({ message: "No images found" });
  }
  res.json(content);
});

const createNewImage = asyncHandler(async (req, res) => {
  const {image, noticiaId} = req.body

  const imagenObject = {
    image,
    noticiaId
  }

  const imagen = await Imagen.create(imagenObject)

  console.log("IMAGEN STATUS")
  console.dir(imagen)

  if (imagen) {
    //Created
    res.send({message: `Imagen cargada para noticia ${noticiaId}`})
  } else {
    res.send({message: `Imagen No se subio para ${noticiaId}`})
  }
});

const updateImage = asyncHandler(async (req, res) => {

});

const deleteImage = asyncHandler(async (req, res) => {

});

module.exports = {
  getAllImages,
  createNewImage,
  updateImage,
  deleteImage,
};
