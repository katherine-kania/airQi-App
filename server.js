////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const UserRouter = require('./controllers/user')
const ProfileRouter = require('./controllers/profile')
const LocationRouter = require('./controllers/location')
const MylocationsRouter = require('./controllers/mylocations')
const LocaleDayDataRouter = require('./controllers/localeDayData')
const CommentRouter = require('./controllers/comment')

const User = require("./models/user")
const Profile = require("./models/profile")
const Location = require("./models/location")
const LocaleDayData= require("./models/localeDayData")
const Comment = require("./models/comment")


// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/profile', ProfileRouter)
app.use('/location', LocationRouter)
app.use('/mylocations', MylocationsRouter)
app.use('/localeDayData', LocaleDayDataRouter)
app.use('/comment', CommentRouter)



app.get('/', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})