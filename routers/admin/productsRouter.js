const express = require('express');
const router = express.Router();
const multer = require('multer');
// const storageMulter = require('../../helpers/storageMulter')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})
const upload = multer({storage: storage})
const controller = require('../../controllers/admin/products.controller')
const validate = require('../../validate/admin/productValidate')

router.get('/', controller.index)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi/', controller.changeMulti)
router.delete('/delete/:id', controller.deleteItem)
router.get('/create', controller.create)
router.post(
  '/create',
  upload.single('thumbnail'),
  validate.createProduct,
  controller.createProduct
)

router.get('/edit/:id', controller.edit)
router.patch(
  '/edit/:id',
  upload.single('thumbnail'),
  validate.createProduct,
  controller.editPatch
)

module.exports = router