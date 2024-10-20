const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadCloud = require('../../middlewares/admin/uploadCloudMiddleware')
const validate = require('../../validate/admin/products-categoryValidate')
const upload = multer()

const controller = require("../../controllers/admin/products-category.controller")
router.get('/', controller.index)
router.get('/create', controller.create)
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.createProduct,
  controller.createProduct
)


module.exports = router