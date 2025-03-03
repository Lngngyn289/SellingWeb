const ProductCategory = require('../../model/products-categoryModel') 
const createTreeHelper = require('../../helpers/createTree')

module.exports.category = async (req,res,next) => {
  let find = {
    deleted: false
  }
  const productsCategory = await ProductCategory.find(find)
  const newProductsCategory = createTreeHelper.tree(productsCategory)
  res.locals.layoutProductsCategory = newProductsCategory
  next()
}