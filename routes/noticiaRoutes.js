const express = require('express')
const router = express.Router()
const noticiasController = require('../controllers/noticiasController')

router.route('/')
    .get(noticiasController.getAllNoticias)
    .post(noticiasController.crearNoticia)
    .patch(noticiasController.actualizarNoticia)
    .delete(noticiasController.borrarNoticia)

module.exports = router