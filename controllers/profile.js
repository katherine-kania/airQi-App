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
	Example.find({})
		.then(examples => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('examples/index', { examples, username, loggedIn })
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

router.post('/profile', (req, res) => {
    req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	Profile.create(req.body)
    .then((profile) => {
        const profileId = req.body.profile
        console.log('this is the req.body', profile)
        res.redirect(`/${profileId}`)
    })
    .catch((error) => {
        res.redirect(`/error?error=${error}`)
    })
})

// index ALL
router.get('/:id', (req, res) => {
    
    Profile.find({ owner: userId })
        .then((profile) => {
            const {username, loggedIn, userId} = req.session
            console.log(profile)
            res.render('profile/index', { profile, username, loggedIn, userId })
        })
        .catch(error => {
            res.redirect(`/error?error=${error}`)
        })
})




// Export the Router
module.exports = router
