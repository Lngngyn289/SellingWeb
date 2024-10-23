const Roles = require('../../model/rolesModel')
const systemConfig = require('../../config/system')
module.exports.index = async (req, res) => {
  let find = {
    deleted: false
  }
  const records = await Roles.find(find)
  res.render("admin/pages/roles/index", {
    pageTitle: "Roles",
    records: records
  })
}

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "Add Roles",
  })
}

module.exports.createRole = async (req, res) => {
  const record = new Roles(req.body)
  await record.save()

  res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

module.exports.edit = async (req, res) => {
  try{
    const id = req.params.id
    let find = {
      _id: id,
      deleted: false
    }
    const data = await Roles.findOne(find)
    res.render("admin/pages/roles/edit", {
      pageTitle: "Edit Roles",
      data: data
    })
  }
  catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/roles/index`)
  }
}

module.exports.editPatch= async (req,res) => {
  try{
    const id = req.params.id
    await Roles.updateOne({_id: id}, req.body)
    req.flash("success", "Updated success!")
    res.redirect('back')
  }
  catch(error){
    req.flash("error", "Update failed")
  }
}

module.exports.editPatch= async (req,res) => {
  try{
    const id = req.params.id
    await Roles.updateOne({_id: id}, req.body)
    req.flash("success", "Updated success!")
    res.redirect('back')
  }
  catch(error){
    req.flash("error", "Update failed")
  }
}

module.exports.editPatch = async (req,res) => {
  try{
    const id = req.params.id
    await Roles.updateOne({_id: id}, req.body)
    req.flash("success", "Updated success!")
    res.redirect('back')
  }
  catch(error){
    req.flash("error", "Update failed")
  }
}

module.exports.permissions = async (req,res) => {
  let find = {
    deleted: false
  }
  const records = await Roles.find(find)
  res.render("admin/pages/roles/permissions", {
    pageTitle: "Add Roles",
    records: records
  })
}

module.exports.permissionsPatch = async (req,res) => {
  try{
    const permissions = JSON.parse(req.body.permissions)
    for(const item of permissions){
      await Roles.updateOne({_id: item.id}, {permissions: item.permissions})
    }
    req.flash("success", "Update success")
  }
  catch(error){
    req.flash("error", "Update failed")
  }
    res.redirect('back')
}


