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

// index that shows only the user's locations
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	console.log('this is the location saved', location)
	Location.find({ owner: userId })
		.then(location => {
			res.render('locations/mine', { location, username, loggedIn })
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
			const locationId = req.body.city 
			console.log('this is the location', location)
			res.redirect(`/locations/${locationId}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})

})

// edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
// 	// we need to get the id
// 	const locationId = req.params.id
// 	Location.findById(locationId)
// 		.then(location => {
// 			res.render('locations/edit', { location })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// update route
// router.put('/:id', (req, res) => {
// 	const locationId = req.params.id
// 	req.body.ready = req.body.ready === 'on' ? true : false

// 	Location.findByIdAndUpdate(locationId, req.body, { new: true })
// 		.then(location => {
// 			res.redirect(`/locations/${location.id}`)
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

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
        console.log('this is the data', air)
    })

	.catch((error) => {
		res.redirect(`/error?error=${error}`)
	})
})

// delete route
router.delete('/:id', (req, res) => {
	const locationId = req.params.id
	Location.findByIdAndRemove(locationId)
		.then(location => {
			res.redirect('/locations')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
