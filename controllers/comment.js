// Import Dependencies
const express = require('express')
const Comment = require('../models/comment')
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

// POST -> to create a comment
router.post('/:localeDayDataid', (req, res) => {
    const localeDayDataId = req.params.localeDayDataId
    console.log('first comment body', req.body)

    req.body.author = req.session.userId
    console.log('updated comment body', req.body)
    LocaleDayData.findById(localeDayDataId)
        .then(localeDayData => {
            localeDayData.comments.push(req.body)
            return localeDayData.save()
        })
        .then(localeDayData => {
            res.redirect(`/localDayData/${localeDayData.id}`)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

// DELETE -> to destroy a comment
router.delete('/delete/:localeDayDataId/:commId', (req, res) => {

    const localeDayDataId = req.params.localeDayDataId
    const commId = req.params.commId

    LocaleDayData.findById(localeDayDataId)
        .then(localeDayData => {
            const theComment = localeDayData.comments.id(commId)

            if ( theComment.author == req.session.userId) {

                theComment.remove()

                return localeDayData.save()
            } else {
                return
            }

        })
        .then(localeDayData => {

            res.redirect(`/localeDayData/${localeDayDataId}`)
        })
        .catch(error => {
            // catch any errors
            console.log(error)
            res.send(error)
        })
})

// Export the Router
module.exports = router