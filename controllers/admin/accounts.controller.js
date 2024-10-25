const Accounts = require('../../model/accountsModel')
const Roles = require('../../model/rolesModel')
const systemConfig = require("../../config/system") 
var md5 = require('md5');

module.exports.index = async (req, res) =>{
  let find = {
    deleted: false
  }

  const records = await Accounts.find(find)
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
