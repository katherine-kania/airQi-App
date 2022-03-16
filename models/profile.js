// import what I need
const { Schema, model } = require('./connection.js')

// create the schema
const ProfileSchema = new Schema(
	{
		owner: { 
			type: mongoose.Schema.Types.ObjectID,
            ref: 'User',
            unique: true
		},
		email: { 
			type: String, 
			required: true 
		},
        ciy: {
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