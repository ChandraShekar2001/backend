const express = require('express');
const errorMiddleware = require('./middleware/error')
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path')

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))

//route imports
const staticPath = path.join(__dirname, './public')
const viewPath = path.join(__dirname, './templates/views')
const productRoute = require('./routes/productRoutes')
const userRoute = require('./routes/userRoutes')
const orderRoute = require('./routes/orderRoutes')
const adminRoute = require('./routes/adminRoutes') 

app.use('/api/v1', productRoute)
app.use('/api/v1', userRoute)
app.use('/api/v1', orderRoute)
app.use('/api/v1', adminRoute)

//static files setup
app.use(express.static(staticPath))
app.set('view engine', 'ejs')
app.set('views', viewPath)

//middleware for error 
app.use(errorMiddleware)


app.get('/', (req, res, next) => {
    res.render('login')
})

// app.get('/login', (req, res, next) => {
//     res.render('login')
// })




module.exports = app
