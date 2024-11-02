const User = require('../../model/userModel')
const Cart = require('../../model/cartsModel')
const ForgotPassword = require('../../model/forgot-passwordModel')
const md5 = require("md5");
const generateHelper = require("../../helpers/generate")
const sendMailHelper = require('../../helpers/sendMail')
//GET user/register
module.exports.register = async (req, res) => {
  res.render('client/pages/user/register',{
    pageTitle: "Sign Up"
  })
}

module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email
  })
  if(existEmail){
    req.flash("error", "Email existed");
    res.redirect("back");
    return;
  } 
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
}

module.exports.login = async (req, res) => {
  res.render('client/pages/user/login',{
    pageTitle: "Sign In"
  })
}

module.exports.loginPost = async (req, res) => {
  const email =req.body.email;
  const password = req.body.password;
  const user = await User.findOne({
    email: email,
    deleted: false
  });
  if(!user) {
    req.flash("error", "Email doesn't exist!");
    res.redirect("back");
    return;
  }
  if(md5(password) !== user.password) {
    req.flash("error", "Password incorrect!");
    res.redirect("back");
    return;
  }
  if(user.status === "inactive") {
    req.flash("error", "Account inactive");
    res.redirect("back");
    return;
  }
  const cart = await Cart.findOne({
    user_id: user.id
  });
  // if(cart) {
  //   res.cookie("cartId",cart.id)
  // } else {
  //   await Cart.updateOne({
  //   _id: req.cookies.cartId
  //   },{
  //     user_id: user.id
  //   })
  // }
 
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
}

//[GET] /user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  // res.clearCookie("cartId")
  res.redirect("/");
}

//GET /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render('client/pages/user/forgot-password',{
    pageTitle: 'Forgot Password'
  })
}

//POST /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  const otp = generateHelper.generateRandomNumber(8)

  if(!user){
    req.flash("error", "email doesn't exists")
    res.redirect('back')
    return
  }
  
  const userForgotPassword = await ForgotPassword.findOne({email: email})
  if(!userForgotPassword){
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now()
    }

    const subject = "CONFIRM OTP"
    const html = `
      OTP to reset password is <b>${otp}, it will be expired in 3 minutes</b>
    `
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    sendMailHelper.sendMail(email,subject,html)
  }
  else{
    req.flash("error", "Wait few minutes to resend")
  }
  res.redirect(`/user/password/otp?email=${email}`)
}


// GET /user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email

  res.render('client/pages/user/otp-password',{
    pageTitle: 'Input OTP',
    email: email
  })
}

// POST /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email
  const otp = req.body.otp
  
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })
  if(!result){
    req.flash("error", "OTP invalid")
    res.redirect('back')
    return
  }

  const user = await User.findOne({
    email: email
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");

}
//GET /user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
      pageTitle: "Reset Password",
  });
};

//POST /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne({
      tokenUser: tokenUser,
  },{
      password: md5(password),
  })
  res.redirect("/");
};

//GET /user/info
module.exports.info = async (req,res) =>{
  res.render("client/pages/user/info", {
    pageTilte: "Account Information",
  })
}