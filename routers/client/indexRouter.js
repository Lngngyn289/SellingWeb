

const categoryMiddleware = require('../../middlewares/client/categoryMiddleware')
const cartMiddleware = require('../../middlewares/client/cartMiddleware')
const userMiddleware = require('../../middlewares/client/userMiddleware')

const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');
const searchRouter = require('./searchRouter');
const cartRouter = require('./cartRouter');
const checkoutRouter = require('./checkoutRouter');
const userRouter = require('./userRouter');


module.exports = (app) =>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use(userMiddleware.infoUser)
  app.use('/', homeRouter);
  app.use('/products', productRouter);
  app.use('/search', searchRouter);
  app.use('/cart', cartRouter);
  app.use('/checkout', checkoutRouter);
  app.use('/user', userRouter);
}