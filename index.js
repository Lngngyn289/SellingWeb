const express = require('express')
const app = express()
require("dotenv").config()
const port = process.env.PORT
const mongoose = require('mongoose')
const db = require('./config/db')
const router = require('./routers/client/indexRouter')
const routerAdmin = require('./routers/admin/indexrouter')
const systemConfig = require('./config/system')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const moment = require('moment')

const { createServer } = require('node:http');
const { Server } = require('socket.io');

const path = require('path')

db.connect();
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride("_method"))
app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.static(`${__dirname}/public`)) 


//SocketIO
const server = createServer(app);
const io = new Server(server);
global._io = io
//End Socket

//flash
app.use(cookieParser('lngngyn'));
app.use(session({
  cookie: { maxAge: 60000 }, 
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
//end flash


//tinymce
app.use('/tinymce',
  express.static(path.join(__dirname, 'node_modules', 'tinymce'))
)
//end tinymce

//local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.locals.moment = moment

router(app)
routerAdmin(app)


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})