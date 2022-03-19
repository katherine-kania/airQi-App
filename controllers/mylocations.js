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


// index that shows only the user's saved daily data
router.get('/', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
    Location.find({})
        .then((locations) => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            console.log('this is the locations saved', locations)
            res.render('mylocations/index', { locations, username, loggedIn, userId })
        })
        .catch(error => {
            res.redirect(`/error?error=${error}`)
        })
})

// Posts daily data 
router.post('/', (req, res) => {
    req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	
    Location.create(req.body)
        .then((location) => {
        
        console.log('this is the loccation', location)
        res.redirect('/mylocations')
        })
        .catch((error) => {
            res.redirect(`/error?error=${error}`)
        })
})

// delete route
router.delete('/:id', (req, res) => {
	const location = req.params.id
	Location.findByIdAndRemove(location)
		.then(location => {
			res.redirect('/mylocations')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
