const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/accounts.controller')
const uploadCloud = require('../../middlewares/admin/uploadCloudMiddleware')
const multer = require('multer');
const upload = multer()
const validate = require('../../validate/admin/accountValidate')

router.get('/', controller.index)
router.get('/create', controller.create)

router.post('/create',
  upload.single('avatar'),
  uploadCloud.upload,
  controller.createAccount
)
router.get('/edit/:id', controller.edit)

router.patch('/edit/:id',
  upload.single('avatar'),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
)

module.exports = router