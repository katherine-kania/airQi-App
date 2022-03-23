// make our .env variables available via process.env
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
console.log(`Mongoose connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
})

mongoose.connection.on("error", (err) => {
console.log("Could not connect to MongoDB!", err);
})

// mongoose.connect(process.env.DATABASE_URL, {
// 	useUnifiedTopology: true,
// 	useNewUrlParser: true,
// })

// save the connection in a variable
const db = mongoose.connection

// create some notification
db.on('open', () => console.log('You are connected to mongo'))
db.on('close', () => console.log('You are disconnected from mongo'))
db.on('error', (error) => console.log(error))

// export the connection
module.exports = mongoose
