//Router
const dashboardRouter = require('./dashboardRouter')
const productsRouter = require('./productsRouter')
const productsCategoryRouter = require('./products-categoryRouter')
const rolesRouter = require('./rolesRouter')
const accountsRouter = require('./accountsRouter')
const authRouter = require('./authRouter')
const myAccountRouter = require('./my-accountRouter')
const settingGeneralRouter = require('./settingRouter')


//Systemconfig
const systemConfig = require('../../config/system')

//auth middleware
const authMiddleware = require('../../middlewares/admin/authMiddleware')

module.exports = (app) =>{
  const PATH_ADMIN = systemConfig.prefixAdmin

  app.use(PATH_ADMIN + '/dashboard',
    authMiddleware.requireAuth,
    dashboardRouter);

  app.use(PATH_ADMIN + '/products',
    authMiddleware.requireAuth,
    productsRouter);

  app.use(PATH_ADMIN + '/products-category', 
    authMiddleware.requireAuth,
    productsCategoryRouter);

  app.use(PATH_ADMIN + '/roles', 
    authMiddleware.requireAuth,
    rolesRouter)

  app.use(PATH_ADMIN + '/accounts', 
    authMiddleware.requireAuth,
    accountsRouter)
    
  app.use(PATH_ADMIN + '/auth', authRouter)
  app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth, myAccountRouter);
  app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth, settingGeneralRouter);

}