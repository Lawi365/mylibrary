if (process.env.NODE_ENV !== 'production'){
    require('dontenv').config()
}

const express = require('express');
const app = express();


const indexRouter = require('./routes/index')

//create view engine.
app.set('view engine','ejs');
app.set('views', __dirname+'/views')
app.set('layout','layouts/layout')
app.use(express.static('public'))

//integrate with mongoose.
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

//check connection.

const db = mongoose.connection

db.on('error', error =>
    console.log(error)
)
db.once('open',()=> console.log('connection succesful'))

//the router created links here.
//It was imported from above now we are callng it in the use fxn.
app.use('/',indexRouter)

//now listen.
app.listen(process.env.PORT || 3000);