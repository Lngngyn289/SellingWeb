const productRouters = require('./productsRouter');
const homeRouters = require('./homeRouter');

module.exports = (app) =>{
  
  app.use('/', homeRouter);

  app.use("/products", productRouter);

}