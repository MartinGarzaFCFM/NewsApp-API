const express = require('express')
const router = express.Router()
const imagenesController = require('../controllers/imagenesController')

router.route('/')
    .get(imagenesController.getAllImages)
    .post(imagenesController.createNewImage)
    .patch(imagenesController.updateImage)
    .delete(imagenesController.deleteImage)

module.exports = router