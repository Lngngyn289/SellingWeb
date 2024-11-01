const Product = require('../../model/productsModel')
const Cart = require('../../model/cartsModel')

const productsHelper = require('../../helpers/product')
//Get: Cart index
module.exports.index = async (req,res,next) => {
  const cartId = req.cookies.cartId
  const cart = await Cart.findOne({
    _id: cartId
  })
  if(cart.products.length > 0){
    for(const item of cart.products){
      const productId = item.product_id 
      const productInfo = await Product.findOne({
        _id: productId,
        deleted: false,
        status: "Active"
      }).select("title thumbnail slug price discountPercentage")
      productInfo.priceNew = productsHelper.priceNewProduct(productInfo)
      item.productInfo = productInfo
      item.totalPrice = productInfo.priceNew * item.quantity
    }
  }
  cart.totalPrice = cart.products.reduce((sum, item) => sum + item.quantity*item.productInfo.priceNew, 0)
  res.render('client/pages/cart/index',{
    pageTitle: "Cart detail",
    cartDetail: cart
  })
}

//Post: Add products to cart
module.exports.addPost = async (req,res, next) => {
  const productId = req.params.productId
  const quantity = parseInt(req.body.quantity)
  const cartId = req.cookies.cartId
  console.log(productId)
  console.log(quantity)

  const objectCart = {
    product_id: productId,
    quantity: quantity
  }
  
  const currentCart = await Cart.findOne({
    _id: cartId
  })

  const existProductInCart = currentCart.products.find(
    item => item.product_id = productId
  )
  if(existProductInCart){
    const quantityNew = quantity + existProductInCart.quantity
    await Cart.updateOne({
      _id: cartId,
      'products.product_id': productId
    }, {
      $set: {
        'products.$.quantity': quantityNew
      }
    });
  } else{
    await Cart.updateOne({
      _id: cartId,
    }, {
      $push: {products: objectCart}
    })
  }
  req.flash('success', 'Add product to cart successfully')
  res.redirect("back")
}

//delete: Delete product in cart
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  await Cart.updateOne({
    _id: cartId,
  }, {
    $pull: {products: {product_id: productId}} 
  })
  req.flash('success', "Product has been deleted")
  res.redirect('back')
}

//GET /cart/update/:productId/:quantity
module.exports.update = async (req,res,next) => {
  const cartId = req.cookies.cartId
  const productId = req.params.productId
  const quantity = req.params.quantity
  
  await Cart.updateOne({
    _id: cartId,
    'products.product_id': productId
  }, {
    $set: {
      'products.$.quantity': quantity
    }
  });

  req.flash('success', 'Update quantity success')
  res.redirect('back')
}