

const categoryMiddleware = require('../../middlewares/client/categoryMiddleware')
const cartMiddleware = require('../../middlewares/client/cartMiddleware')
const userMiddleware = require('../../middlewares/client/userMiddleware')
const settingMiddleware = require('../../middlewares/client/settingMiddleware')
const authMiddleware = require('../../middlewares/client/authMiddleware')


const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');
const searchRouter = require('./searchRouter');
const cartRouter = require('./cartRouter');
const checkoutRouter = require('./checkoutRouter');
const userRouter = require('./userRouter');
const chatRouter = require('./chatRouter')

module.exports = (app) =>{
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use(userMiddleware.infoUser)
  app.use(settingMiddleware.settingGeneral)
  app.use('/', homeRouter);
  app.use('/products', productRouter);
  app.use('/search', searchRouter);
  app.use('/cart', cartRouter);
  app.use('/checkout', checkoutRouter);
  app.use('/user', userRouter);
  app.use('/chat', authMiddleware.requireAuth, chatRouter);
}