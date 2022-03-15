// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const placeSchema = new Schema(
	{
		title: { type: String, required: true },
		body: { type: String, required: true },
        amount: { type: Number, required: true },
		ready: { type: Boolean, required: true },
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
	},
	{ timestamps: true }
)

const Place = model('Place', placeSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Place