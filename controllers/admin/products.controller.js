const Product = require("../../model/productsModel")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const systemConfig = require("../../config/system") 
const createTreeHelper = require("../../helpers/createTree")
const ProductCategory = require("../../model/products-categoryModel")
const Accounts = require('../../model/accountsModel')

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
// End Pagination

  let sort = {}
  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue
  }

  
  const products = await Product.find(find)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)
    .sort(sort)

  for(const product of products){
    const user = await Accounts.findOne({
      _id: product.createdBy.account_id
    })

    if(user){
      product.accountFullName = user.fullName
    }

    const updatedBy = product.updatedBy.slice(-1)[0]
    if(updatedBy){
      const userUpdated = await Accounts.findOne({
        _id: updatedBy.account_id
      })

      updatedBy.accountFullName = userUpdated.fullName
    }
  }
  
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

  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  await Product.updateOne({_id: id},{
    status: status,
    $push: {updatedBy: updatedBy}
  })

  req.flash("success", "Update status successfully")
  res.redirect('back')
}

module.exports.changeMulti = async(req, res) => {
  const type = req.body.type
  const ids = req.body.ids.split(", ")
  const updatedBy = {
    account_id: res.locals.user.id,
    updatedAt: new Date()
  }

  switch(type){
    case "Active":
      await Product.updateMany({_id: {$in: ids}}, {
        status: "Active",
        $push: {updatedBy: updatedBy}
      })
      req.flash("success", `Update status of ${ids.length} products success`)
      break
    case "Inactive":

      await Product.updateMany({_id: {$in: ids}}, {
        status: "Inactive",
      })
      req.flash("success", `Update status of ${ids.length} products success`)
      break
    case "Delete":
      await Product.updateMany({_id: ids}, {
        deleted: true,
        // deletedAt: new Date()
        deletedBy: {
          account_id: res.locals.user.id,
          deletedAt: new Date()
        }
      })
      req.flash("success", `Delete ${ids.length} products`)
    default:
      
  }
  res.redirect('back')
}

module.exports.deleteItem =  async (req,res) => {
  const id = req.params.id
  // await Product.deleteOne({_id: id})
  await Product.updateOne({_id: id}, {
    deleted: true,
    // deletedAt: new Date()
    deletedBy: {
      account_id: res.locals.user.id,
      deletedAt: new Date()
    }
  })
  res.redirect('back')
}

module.exports.create = async (req,res) => {
  console.log(res.locals.user)
  let find = {
    deleted: false
  }
  const category = await ProductCategory.find(find)
  const newCategory = createTreeHelper.tree(category)

  res.render("admin/pages/products/create",{
    pageTitle: "Create Product",
    category: newCategory
  })
}

module.exports.createProduct = async (req,res) => {
  console.log(req.body)
  req.body.price = parseInt(req.body.price)
  req.body.stock = parseInt(req.body.stock)
  req.body.discountPercentage= parseInt(req.body.discountPercentage)
  req.body.createdBy ={
    account_id: res.locals.user.id
  }
  const product = new Product(req.body)
  // await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`)
}



module.exports.edit = async (req,res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
  
    const product = await Product.findOne(find);
    const category = await ProductCategory.find({
      deleted: false
    })
    const newCategory = createTreeHelper.tree(category)

    res.render("admin/pages/products/edit", {
      pageTitle: 'Edit Product',
      product: product,
      category: newCategory
    })
  } catch(error){
    req.flash("error", "Product doesnt exists")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}

module.exports.editPatch = async (req,res) => {
  // console.log(req.body)
  req.body.price = parseInt(req.body.price)
  req.body.stock = parseInt(req.body.stock)
  req.body.discountPercentage= parseInt(req.body.discountPercentage)
  try{
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date()
    }

    await Product.updateOne({_id: req.params.id}, {
      ...req.body,
      $push: {updatedBy: updatedBy}
    })
    req.flash("success", "Update success")
  }catch(error){
    req.flash("error", "Update fail")
  }
  res.redirect('back')
}

module.exports.detail = async (req,res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id
    }
  
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product
    })
  } catch(error){
    req.flash("error", "Product doesnt exists")
    res.redirect(`${systemConfig.prefixAdmin}/products`)
  }
}