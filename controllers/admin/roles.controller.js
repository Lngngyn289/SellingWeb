const Role = require('../../model/rolesModel')
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
  const record = new Role(req.body)
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
    const data = await Role.findOne(find)
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
    await Role.updateOne({_id: id}, req.body)
    req.flash("success", "Updated success!")
    res.redirect('back')
  }
  catch(error){
    req.flash("error", "Update failed")
  }
}

