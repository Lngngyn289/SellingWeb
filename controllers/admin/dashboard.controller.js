const ProductCategory = require("../../model/products-categoryModel");
const Product = require("../../model/productsModel");
const Account = require("../../model/accountsModel");
const User = require("../../model/userModel");
//[GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
        total: 0,
        active: 0,
        inactive: 0,
    },
    products: {
        total: 0,
        active: 0,
        inactive: 0,
    },
    account: {
        total: 0,
        active: 0,
        inactive: 0,
    },
    user: {
        total: 0,
        active: 0,
        inactive: 0,
    },
  }
  statistic.categoryProduct.total = await ProductCategory.countDocuments({
    deleted: false,
  })
  statistic.categoryProduct.active = await ProductCategory.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
    status: "inactive",
    deleted: false
  })
  statistic.products.total = await Product.countDocuments({
    deleted: false,
  })
  statistic.products.active = await Product.countDocuments({
    status: "Active",
    deleted: false
  })
  statistic.products.inactive = await Product.countDocuments({
    status: "Inactive",
    deleted: false
  })
  statistic.account.total = await Account.countDocuments({
    deleted: false,
  })
  statistic.account.active = await Account.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.account.inactive = await Account.countDocuments({
    status: "inactive",
    deleted: false
  })
  statistic.user.total = await User.countDocuments({
    deleted: false,
  })
  statistic.user.active = await User.countDocuments({
    status: "active",
    deleted: false
  })
  statistic.user.inactive = await User.countDocuments({
    status: "inactive",
    deleted: false
  })
  res.render("admin/pages/dashboard/index.pug",{
    pageTitle: "Trang tổng quan",
    statistic: statistic
  });
};