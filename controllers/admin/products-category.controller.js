const ProductCategory = require('../../model/products-categoryModel')
const systemConfig = require("../../config/system") 
const createTreeHelper = require("../../helpers/createTree")

module.exports.index = async (req,res)  => {

  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records)
  res.render("admin/pages/products-category/index", {
    pageTitle: "Products Category",
    records: newRecords
  })
}

module.exports.create = async (req,res)  => {
  let find = {
    deleted: false
  }

  const records = await ProductCategory.find(find)
  const newRecords = createTreeHelper.tree(records)

  res.render("admin/pages/products-category/create", {
    pageTitle: "Create Products Category",
    records: newRecords
  })
}

module.exports.createProduct = async (req,res) => {
  const record = new ProductCategory(req.body)
  await record.save()
  res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  console.log(req.body)
}

module.exports.edit = async (req,res) => {
  try{
    const id = req.params.id;
    const data = await ProductCategory.findOne({
      _id: id,
      deleted: false
    })
  
    const records = await ProductCategory.find({
      deleted: false
    })
    const newRecords = createTreeHelper.tree(records)
  
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Edit Category",
      data: data,
      records: newRecords
    })
  }
  catch(error){
    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
  }
}

module.exports.editPatch = async (req,res) => {
  const id = req.params.id
  await ProductCategory.updateOne({_id: id}, req.body)
  res.redirect('back')
}
