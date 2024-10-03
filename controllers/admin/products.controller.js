const Product = require("../../model/productsModel")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

module.exports.index = async (req,res)  => {
  const filterStatus = filterStatusHelper(req.query)
  let find = {
    deleted: false
  }
  if(req.query.status){
    find.status = req.query.status
  }
  const objectSearch = searchHelper(req.query);
  if(objectSearch.regex){
    find.title = objectSearch.regex
  }

  //Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelper(
    {
    limitItems: 4,
    currentPage: 1
    },
    req.query,
    countProducts
  )

  if(req.query.page){
    objectPagination.currentPage = parseInt(req.query.page)
  }
  
  const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
  res.render("admin/pages/products/index",{
    pageTitle: 'ProductsList',
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: objectPagination
  })
}


//change status
module.exports.changeStatus =  async (req,res) => {
  const status = req.params.status
  const id = req.params.id

  await Product.updateOne({_id: id},{
    status: status
  })

  req.flash("success", "Update status successfully")
  res.redirect('back')
}

module.exports.changeMulti = async(req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ")
  switch(type){
    case "Active":
      await Product.updateMany({_id: {$in: ids}}, {status: "Active"})
      req.flash("success", `Update status of ${ids.length} products success`)
      break
    case "Inactive":
      await Product.updateMany({_id: {$in: ids}}, {status: "Inactive"})
      req.flash("success", `Update status of ${ids.length} products success`)
      break
    case "Delete":
      await Product.updateMany({_id: ids}, {
        deleted: true,
        deletedAt: new Date()
      })
      req.flash("success", `Delete ${ids.length} products`)
    default:
      
  }
  res.redirect('back')
}

module.exports.deleteItem =  async (req,res) => {
  const id = req.params.id
  // await Product.deleteOne({_id: id})
  await Product.updateOne({_id: id}, {deleted: true})
  res.redirect('back')
}

module.exports.create = async (req,res) => {
  res.render("admin/pages/products/create")
}