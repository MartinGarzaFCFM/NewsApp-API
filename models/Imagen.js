const mongoose = require("mongoose");
const imagenSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    noticiaId: {
      //type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
      ref: "Noticia",
    },
  }
);

module.exports = mongoose.model("Imagen", imagenSchema);
