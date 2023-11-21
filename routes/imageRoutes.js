const express = require('express')
const router = express.Router()
const imagesController = require('../controllers/imagesController')

router.route('/')
    .get(imagesController.getAllImages)
    .post(imagesController.createNewImage)
    .patch(imagesController.updateImage)
    .delete(imagesController.deleteImage)

module.exports = router