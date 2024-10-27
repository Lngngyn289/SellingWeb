const md5 = require('md5')
const Accounts = require('../../model/accountsModel')

// admin/my-account
module.exports.index = async (req,res) => {
  res.render("admin/pages/my-account/index",{
    pageTitle: "My Account"
  })
}

// admin/my-account/edit
module.exports.edit = async (req,res) => {
  res.render("admin/pages/my-account/edit",{
    pageTitle: "Edit My Account"
  })
}

module.exports.editPatch = async (req,res) => {
  const id = res.locals.id
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