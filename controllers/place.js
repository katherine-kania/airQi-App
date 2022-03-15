// Import Dependencies
const express = require('express')
const Place = require('../models/place')

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
router.get('/', (req, res) => {
	Place.find({})
		.then(places => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('places/index', { places, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's places
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Place.find({ owner: userId })
		.then(places => {
			res.render('places/index', { places, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('places/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	Place.create(req.body)
		.then(place => {
			console.log('this was returned from create', place)
			res.redirect('/places')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const placeId = req.params.id
	Place.findById(placeId)
		.then(place => {
			res.render('places/edit', { place })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const placeId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	Place.findByIdAndUpdate(placeId, req.body, { new: true })
		.then(place => {
			res.redirect(`/places/${place.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const placeId = req.params.id
	Place.findById(placeId)
		.then(place => {
            const {username, loggedIn, userId} = req.session
			res.render('places/show', { place, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const placeId = req.params.id
	Place.findByIdAndRemove(placeId)
		.then(place => {
			res.redirect('/places')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router