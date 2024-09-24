const Product = require('../../model/productsModel')

module.exports.index = async (req, res) => {
  const products = await Product.find({
    
  });
  
  products.forEach(product => {
    product.priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(0)
  });

  res.render('client/pages/products/index',{
    pageTitle: "Product List",
    products: products
  });
}

