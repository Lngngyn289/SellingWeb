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

router.get('/', controller.index)
router.patch('/change-status/:status/:id', controller.changeStatus)
router.patch('/change-multi/', controller.changeMulti)
router.delete('/delete/:id', controller.deleteItem)
router.get('/create', controller.create)
router.post('/create',upload.single('thumbnail'), controller.createProduct)


module.exports = router