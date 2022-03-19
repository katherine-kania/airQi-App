// Import Dependencies
const express = require('express')
const axios = require('axios')
const LocaleDayData = require('../models/localeDayData')

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
    LocaleDayData.find({})
        .then((localeDayDatas) => {
            const username = req.session.username
            const loggedIn = req.session.loggedIn
            const userId = req.session.userId
            console.log('this is the localeDayData saved', localeDayDatas)
            res.render('localeDayData/index', { localeDayDatas, username, loggedIn, userId })
        })
        .catch(error => {
            res.redirect(`/error?error=${error}`)
        })
})

// Posts daily data 
router.post('/', (req, res) => {
    req.body.ready = req.body.ready === 'on' ? true : false
	req.body.owner = req.session.userId
	
    LocaleDayData.create(req.body)
        .then((localeDayData) => {
        
        console.log('this is the localeDayData', localeDayData)
        res.redirect('/localeDayData')
        })
        .catch((error) => {
            res.redirect(`/error?error=${error}`)
        })
})

// show route
router.get('/:id', (req, res) => {
	const localeDayDataId = req.params.id
	LocaleDayData.findById(localeDayDataId)
		.then(localeDayData => {
            const {username, loggedIn, userId} = req.session
			res.render('localeDayData/show', { localeDayData, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const localeDayData = req.params.id
	LocaleDayData.findByIdAndRemove(localeDayData)
		.then(dayData => {
			res.redirect('/localeDayData')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
