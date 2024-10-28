const Products = require('../../model/productsModel')
const productsHelper = require('../../helpers/product')

module.exports.index = async (req, res) =>{
  //List special products
  const productsFeatured = await Products.find({
    featured: "1",
    deleted: false,
    status: "Active"
  })
  const newProducts = productsHelper.priceNewProducts(productsFeatured)
  // End List special products


  res.render('client/pages/home/index',{
    pageTitle: "trang chủ",
    productsFeatured: newProducts
  })
}