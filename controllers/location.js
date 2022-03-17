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

// Routes

// index ALL
// router.get('/', (req, res) => {
// 	Location.find({})
// 		.then(locations => {
// 			const username = req.session.username
// 			const loggedIn = req.session.loggedIn
			
// 			res.render('locations/index', { locations, username, loggedIn })
// 		})
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })


router.post('/mine', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	const { username, userId, loggedIn } = req.session
	Location.create(req.body)
		.then(location => {
			console.log('this is the req.body', req.body)
			// res.render('locations/mine', { location, username, loggedIn })
			res.redirect('/locations/mylocations')
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's locations
router.get('/mylocations', (req, res) => {
    // destructure user info from req.session
	const location = req.params.id
    const { username, userId, loggedIn } = req.session
	console.log('this is the location saved', location)
	Location.find({ owner: userId })
		.then(locations => {
			res.render('locations/mine', { locations, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('locations/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
// embeds the location search and redirects to locations/:location
router.post('/location', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false
	
	req.body.owner = req.session.userId
	
	Location.create(req.body)
	.then((location) => {
		const locationId = req.body.search
		console.log('this is the location', location)
		res.redirect(`/locations/${locationId}`)
	})
	.catch((error) => {
		res.redirect(`/error?error=${error}`)
	})
})



// show route
// displays the location air quality data
router.get('/:id', (req, res) => {
	const location = req.params.id

	axios.get(
        `https://api.weatherapi.com/v1/current.json?key=68678de3a6f948dab14210014221403&q=${location}&aqi=yes&alerts=yes`
    )
    .then((data) => {
		const {username, loggedIn, userId} = req.session
		const air = data
        res.render('locations/show', { air, username, loggedIn, userId })
        // console.log('this is the data', air)
    })

	.catch((error) => {
		res.redirect(`/error?error=${error}`)
	})
})


// Export the Router
module.exports = router
