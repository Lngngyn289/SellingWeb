const productRouters = require('./productsRouter');
const homeRouters = require('./homerouter');

module.exports = (app) =>{
  
  app.use('/', homeRouters);

  app.use("/products", productRouters);

}