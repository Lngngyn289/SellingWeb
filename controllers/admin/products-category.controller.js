const ProductCategory = require('../../model/products-categoryModel')
const systemConfig = require("../../config/system") 

module.exports.index = async (req,res)  => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);
  res.render("admin/pages/products-category/index", {
    pageTitle: "Products Category",
    records: records
  })
}

module.exports.create = async (req,res)  => {
  res.render("admin/pages/products-category/create", {
    pageTitle: "Create Products Category"
  })
}

module.exports.createProduct = async (req,res) => {
  const record = new ProductCategory(req.body)
  await record.save()
  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  console.log(req.body)
}
