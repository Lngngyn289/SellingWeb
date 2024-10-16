const productRouter = require('./productsRouter');
const homeRouter = require('./homeRouter');

module.exports = (app) =>{
  
  app.use('/', homeRouter);

  app.use("/products", productRouter);

}