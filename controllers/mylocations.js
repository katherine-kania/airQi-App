// Import Dependencies
const express = require('express')
const axios = require('axios')
const Location = require('../models/location')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})


// index that shows only the user's examples
router.get('/', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Location.find({ owner: userId })
		.then(location => {
			console.log('these are the locations', location)
			res.render('mylocations/index', { location, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's locations
router.get('/', (req, res) => {
    // destructure user info from req.session
	// const location = req.params.id
    // const { username, userId, loggedIn } = req.session
	Location.find({})
		.then(locations => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			console.log('this is the location saved', location)
			res.render('mylocations/index', { locations, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const locationId = req.params.id
	Location.findByIdAndRemove(locationId)
		.then(location => {
			console.log('this is the response from location', location)
			res.redirect('/')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
