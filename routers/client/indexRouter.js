const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');
const categoryMiddleware = require('../../middlewares/client/categoryMiddleware')
const searchRouter = require('./searchRouter');


module.exports = (app) =>{
  app.use(categoryMiddleware.category)
  app.use('/', homeRouter);
  app.use('/products', productRouter);
  app.use('/search', searchRouter);

}