require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)

//Database connection
const url = 'mongodb://localhost/Foodigo';
mongoose.connect(url,{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected...');
}).catch(error =>{
    console.log("Connection failed...")
});

//session store
let mongoStore = new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//session config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24} //24 hours, after this much time session will be automatically deleted from database
}))

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json()) // because when we have json requests but server doesn't know

//Global middleware
app.use((req,res,next) => {
    res.locals.session = req.session //to access session data into response
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
} )