// Import Dependencies
const express = require('express')
const axios = require('axios')
const Profile = require('../models/profile')

// Create router
const router = express.Router()


// Routes

// GET to render the signup form
router.get('/create', (req, res) => {
	res.render('profile/new')
})

// POST to send the signup info
router.post('/create', async (req, res) => {

	// create a new profile
	Profile.create(req.body)
		// if created successfully redirect to login
		.then((profile) => {
			res.redirect('/auth/login')
		})
		// if an error occurs, send err
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
