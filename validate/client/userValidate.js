module.exports.registerPost = (req,res,next) => {
  if(!req.body.fullName) {
      req.flash("error", `Input Name!`);
      res.redirect("back");
      return;
  }
  if(!req.body.email) {
      req.flash("error", `Input Email!`);
      res.redirect("back");
      return;
  }
  if(!req.body.password) {
      req.flash("error", `Input Password!`);
      res.redirect("back");
      return;
  }
  next();
}

module.exports.loginPost = (req,res,next) => {
  if(!req.body.email) {
      req.flash("error", `Vui lòng nhập Email!`);
      res.redirect("back");
      return;
  }
  if(!req.body.password) {
      req.flash("error", `Vui lòng nhập password!`);
      res.redirect("back");
      return;
  }
  next();
}

module.exports.forgotPasswordPost = (req,res,next) => {
  if(!req.body.email) {
      req.flash("error", `Please input Email`);
      res.redirect("back");
      return;
  }
  next();
}
module.exports.resetPasswordPost = (req,res,next) => {
  if(!req.body.password) {
    req.flash("error", `Please input password!`);
    res.redirect("back");
    return;
  }
  if(!req.body.confirmPassword) {
    req.flash("error", `Please input confirm password!`);
    res.redirect("back");
    return;
  }
  if(req.body.confirmPassword != req.body.password) {
    req.flash("error", `Confirm Password Wrong!`);
    res.redirect("back");
    return;
  }
  next();
}