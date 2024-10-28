const Product = require('../../model/productsModel')
const ProductCategory = require('../../model/products-categoryModel')
const productsHelper = require('../../helpers/product')
const productsCategoryHelper = require('../../helpers/product-category')

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "Active",
    deleted: false
  });
  
  products.forEach(product => {
    product.priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(0)
  });

  res.render('client/pages/products/index',{
    pageTitle: "Product List",
    products: products
  });
}

//get /products/:slug
module.exports.detail = async (req, res) => {
  try{
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "Active"
    }

    const product = await Product.findOne(find)
    res.render("client/pages/products/detail",{
      pageTitle: "Product detail",
      product: product
    })
  } catch(error){
    res.redirect('/products')
  }
  
}

//get /product/slugCategory
module.exports.category = async (req,res) => {
  const category = await ProductCategory.findOne({
    slug: req.params.slugCategory,
    deleted: false
  })



  const listSubCategory = await productsCategoryHelper.getSubCategory(category.id)
  const listSubCategoryId = listSubCategory.map(item => item.id)

  const products = await Product.find({
    product_category_id: {$in: [category.id, ...listSubCategoryId]},
    deleted: false
  })

  const newProducts = productsHelper.priceNewProducts(products)
  
  res.render("client/pages/products/index",{
    pageTitle: category.title,
    products: newProducts
  })
  
}
