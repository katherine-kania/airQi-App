// Import Dependencies
const express = require('express')
const axios = require('axios')
const Profile = require('../models/profile')

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

// Routes
//index
router.get('/', (req, res) => {
	Profile.find({})
		.then(profiles => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('profile/index', { profiles, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// GET to render the signup form
router.get('/create', (req, res) => {
    const { username, userId, loggedIn } = req.session
    res.render('profile/new', { username, loggedIn, userId })
})

router.post('/', (req, res) => {
    req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	Profile.findOne(req.body)
    .then((profile) => {
        const profileId = req.body.profile
        console.log('this is the req.body', profile)
        res.redirect('/profile')
    })
    .catch((error) => {
        res.redirect(`/error?error=${error}`)
    })
})


// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const profileId = req.params.id
	Profile.findById(profileId)
		.then(profile => {
			res.render('profile/edit', { profile })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const profileId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Profile.findByIdAndUpdate(profileId, req.body, { new: true })
		.then(profile => {
			res.redirect('/profile')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const profileId = req.params.id
	Profile.findById(profileId)
		.then(profile => {
            const {username, loggedIn, userId} = req.session
			res.render('profile/show', { profile, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})




// Export the Router
module.exports = router
