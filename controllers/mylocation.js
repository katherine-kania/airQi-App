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


router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	const { username, userId, loggedIn } = req.session
	Location.create(req.body)
		.then(location => {
			console.log('this is the req.body', req.body)
			// res.render('locations/mine', { location, username, loggedIn })
			res.redirect('/mylocations')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's locations
router.get('/', (req, res) => {
    // destructure user info from req.session
	const location = req.params.id
    const { username, userId, loggedIn } = req.session
	console.log('this is the location saved', location)
	Location.find({ owner: userId })
		.then(locations => {
			res.render('mylocations/index', { locations, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
