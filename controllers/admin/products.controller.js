const Product = require("../../model/productsModel")
const filterStatusHelper = require("../../helpers/filterStatus")

module.exports.index = async (req,res)  => {
  const filterStatus = filterStatusHelper(req.query)
  let find = {}
  if(req.query.status){
    find.status = req.query.status
  }

  let keyword = ""
  if(req.query.keyword){
    keyword = req.query.keyword
    const regex = new RegExp(keyword, "i")
    find.title = regex
  }
  
  const products = await Product.find(find)
  res.render("admin/pages/products/index",{
    pageTitle: 'ProductsList',
    products: products,
    filterStatus: filterStatus,
    keyword: keyword
  })
}