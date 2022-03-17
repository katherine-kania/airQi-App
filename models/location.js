// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const LocationSchema = new Schema(
	{
		city: { 
			type: String, 
			required: true
		},
		region: { 
			type: String, 
			required: true
		},
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Location = model('Location', LocationSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Location
