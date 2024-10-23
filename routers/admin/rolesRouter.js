const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/roles.controller')

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create', controller.createRole)
router.get('/edit/:id', controller.edit)
router.patch('/edit/:id', controller.editPatch)
router.patch('/permissions', controller.permissionsPatch)
router.get('/permissions', controller.permissions)



module.exports = router