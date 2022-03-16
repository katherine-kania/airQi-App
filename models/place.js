// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const PlaceSchema = new Schema(
	{
		city: { 
			type: String, 
			required: true 
		},
		state: { 
			type: String, 
			required: true 
		},
        lat: { 
			type: Number, 
			required: true 
		},
		lon: { 
			type: Number, 
			required: true 
		},
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Place = model('Place', PlaceSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Place
