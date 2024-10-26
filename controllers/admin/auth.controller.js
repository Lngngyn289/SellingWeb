const Accounts = require('../../model/accountsModel')
const md5 = require('md5')
const systemConfig = require('../../config/system')

module.exports.login = (req, res) =>{
  res.render('admin/pages/auth/login',{
    pageTitle: "Login"
  })
}

module.exports.loginPost = async (req, res) =>{
  const email = req.body.email
  const password = req.body.password
  const user = await Accounts.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    req.flash("error", "email doesn't exist")
    res.redirect('back')
    return
  }

  if(md5(password) != user.password){
    req.flash("error", "Wrong password")
    res.redirect('back')
    return
  }

  if(user.status == "inactive"){
    req.flash("error", "Account Inactive")
    res.redirect('back')
    return;
  }
  res.cookie("token", user.token)
  res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}

module.exports.logout = (req,res) => {
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}