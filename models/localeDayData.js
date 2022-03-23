// import what I need
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')
const Location = require('./location')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// create the schema
const LocaleDayDataSchema = new Schema(
	{
	    name: {
            type: String
        },
        region: {
            type: String
        },
        country: {
            type: String
        },
        usEpaIndex: { 
			type: Number 
		},
        co: { 
			type: Number 
		},
        no2: { 
			type: Number 
		},
        o3: { 
			type: Number 
		},
        so2: { 
			type: Number 
		},
        pm2_5: { 
			type: Number 
		},
        pm10: { 
			type: Number
		},
		location: {
			type: Schema.Types.ObjectID,
			ref: 'Location',
		},
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		},
		comments: [commentSchema],
	},
	{ timestamps: true }
)

// creat the model
const LocaleDayData = model('LocaleDayData', LocaleDayDataSchema)

// export the model
module.exports = LocaleDayData