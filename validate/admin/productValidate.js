module.exports.createProduct = (req,res,next) => {
  if(!req.body.title){
    req.flash("error", `Please input title product`)
    res.redirect('back')
    return
  }
  next()
}