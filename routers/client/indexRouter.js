const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware')

module.exports = (app) =>{
  app.use(categoryMiddleware.category)
  app.use('/', homeRouter);
  app.use('/products', productRouter);

}