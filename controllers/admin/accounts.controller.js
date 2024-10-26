const Accounts = require('../../model/accountsModel')
const Roles = require('../../model/rolesModel')
const systemConfig = require("../../config/system") 
var md5 = require('md5');

module.exports.index = async (req, res) =>{
  let find = {
    deleted: false
  }

  const records = await Accounts.find(find).select("-password -token")
  for(const record of records){
    const role = await Roles.findOne({
      deleted: false,
      _id: record.role_id
    });
    record.role = role
  }
  res.render('./admin/pages/accounts/index',{
    pageTitle: "Accounts List",
    records: records
  })
}

module.exports.create = async (req,res) => {
  let find = {
    deleted: false
  }
  const roles = await Roles.find(find)

  res.render('./admin/pages/accounts/create', {
    pageTitle: 'Create Account',
    roles: roles
  })
}

module.exports.createAccount = async (req,res) => {
  console.log(req.body)
  const emailExist = await Accounts.findOne({
    email: req.body.email,
    deleted: false
  })
  if(emailExist){
    req.flash("error", "This email existed")
    res.redirect('back')
  }else{
    req.body.password = md5(req.body.password)
    const record = new Accounts(req.body)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  } 
}

module.exports.edit = async (req,res) => {
  let find = {
    deleted: false,
    _id: req.params.id
  }

  try{
    const data = await Accounts.findOne(find)
    const roles = await Roles.find({
      deleted: false
    })

    res.render('admin/pages/accounts/edit', {
      pageTitle: "Edit Account",
      data: data,
      roles: roles
    })
  } catch(err){
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`)
  }
}

module.exports.editPatch = async (req,res) => {
  const id = req.params.id
  const emailExist = await Accounts.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false
  })

  if(emailExist){
    req.flash("error", "This email existed")
  }else{
    if(req.body.password){
      req.body.password = md5(req.body.password)
    } else {
      delete req.body.password
    }
    await Accounts.updateOne({_id: id}, req.body)
    req.flash("success", 'Update success')
  }
  res.redirect("back")
}
