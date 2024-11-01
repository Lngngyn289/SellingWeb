const Product = require('../../model/productsModel')
const productsHelper = require('../../helpers/product')

module.exports.index = async (req, res) => {

  const keyword = req.query.keyword
  let newProducts = []
  if(keyword){
    const regex = new RegExp(keyword, "i")
    const products = await Product.find({
      title: regex,
      deleted: false,
      status: "Active"
    })
    newProducts = productsHelper.priceNewProducts(products)
  }
  

  res.render("client/pages/search/index", {
    pageTitle: 'Search Result',
    keyword: keyword,
    products: newProducts
  })
}