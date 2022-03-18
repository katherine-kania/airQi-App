// import what I need
const { Schema, model } = require('./connection.js')

// import user model for populate
const User = require('./user')

// create the schema
const ProfileSchema = new Schema(
	{
		owner: { 
			type: Schema.Types.ObjectID,
            ref: 'User',
		},
        firstName: { 
			type: String, 
            required: true
		},
        lastName: { 
			type: String, 
            required: true
		},
		email: { 
			type: String, 
			required: true 
		},
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        dateOfBirth: { 
            type: Date,
            required: true,
            trim: true
        },
        concerns: [String]
	},
	{ timestamps: true }
)

// creat the model
const Profile = model('Profile', ProfileSchema)

// export the model
module.exports = Profile