const Product = require("../../model/productsModel")

module.exports.index = async (req,res)  => {
  let filterStatus = [
    {
      name: "ALL",
      status: "",
      class: ""
    },
    {
      name: "Active",
      status: "Active",
      class: ""
    },
    {
      name: "Inactive",
      status: "Inactive",
      class: ""
    }
  ]

  if(req.query.status){
    const index = filterStatus.findIndex(item => item.status == req.query.status) 
    filterStatus[index].class = "active"
  }
  else{
    const index = filterStatus.findIndex(item => item.status == "")
    filterStatus[index].class = "active"
  }
  
  let find = {}
  if(req.query.status){
    find.status = req.query.status
  }
  
  const products = await Product.find(find)
  res.render("admin/pages/products/index",{
    pageTitle: 'ProductsList',
    products: products,
    filterStatus: filterStatus
  })
}