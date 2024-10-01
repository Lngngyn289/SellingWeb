const express = require('express')
const app = express()
const port = 3000
require("dotenv").config()
const mongoose = require('mongoose')
const db = require('./config/db')
const router = require('./routers/client/indexRouter')
const routerAdmin = require('./routers/admin/indexrouter')
const systemConfig = require('./config/system')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

db.connect();
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static('public')) 

//local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

router(app)
routerAdmin(app)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})