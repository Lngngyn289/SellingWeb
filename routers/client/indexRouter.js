const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware')
const cartMiddleware = require('../../middlewares/client/cartMiddleware')
const searchRouter = require('./searchRouter');
const cartRouter = require('./cartRouter');


module.exports = (app) =>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use('/', homeRouter);
  app.use('/products', productRouter);
  app.use('/search', searchRouter);
  app.use('/cart', cartRouter);
}