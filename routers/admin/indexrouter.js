const dashboardRouter = require('./dashboardRouter')
const systemConfig = require('../../config/system')
const productsRouter = require('./productsRouter')
const productsCategoryRouter = require('./products-categoryRouter')
const rolesRouter = require('./rolesRouter')
const accountsRouter = require('./accountsRouter')
const authRouter = require('./authRouter')


module.exports = (app) =>{
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard', dashboardRouter);
  app.use(PATH_ADMIN + '/products', productsRouter);
  app.use(PATH_ADMIN + '/products-category', productsCategoryRouter);
  app.use(PATH_ADMIN + '/roles', rolesRouter)
  app.use(PATH_ADMIN + '/accounts', accountsRouter)
  app.use(PATH_ADMIN + '/auth', authRouter)

}