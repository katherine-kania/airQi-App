// import what I need
const { Schema, model } = require('./connection.js')

// import user model for populate
const localeDayData = require('./user')

// create the schema
const LocaleDayDataSchema = new Schema(
	{
		date: { 
			type: Date
        },
        name: {
            type, String
        },
        region: {
            type, String
        },
        country: {
            type, String
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
		}
	},
	{ timestamps: true }
)

// creat the model
const LocaleDayData = model('LocaleDayData', LocaleDayDataSchema)

// export the model
module.exports = LocaleDayData