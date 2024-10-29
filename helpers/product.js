module.exports.priceNewProducts = (products) => {
  products.forEach(product => {
    product.priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(0)
  });
  return products
}

module.exports.priceNewProduct = (product) => {
  const priceNew = (product.price*(100-product.discountPercentage)/100).toFixed(0)
  return priceNew
}